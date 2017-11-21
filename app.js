const Domain  = 'api.nytimes.com';
const BasePath = '/svc/topstories/v2/';
const API_KEY = 'a409a682764b45a0aaa15393c66bf8ca';

function buildUrl(url) {
  return 'https://' + Domain + BasePath + url + '.json?api_key=' + API_KEY;
}

Vue.component('news-list', {
  // 親スコープからコンポーネントに渡したいデータ
  props: ['results'],
  // マークアップを定義することで再利用性を高くする
  template: `
    <section>
      <div class="row" v-for="posts in processPost">
        <div class="column large-3 meduim-6" v-for="post in posts">
          <div class="card">
            <div class="card-divider">{{ post.title }}</div>
            <a :href="post.url" target="_blank"><img :src="post.image_url"/></a>
            <div class="card-section">
              <p>{{ post.abstract }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  computed: {
    processPost() {
      let post = this.results
      post.map(post => {
        let image = post.multimedia.find(media => media.format === 'superJumbo');
        post.image_url = image ? image.url : 'http://placehold.it/300x200?text=N/A';
      });

      let i,j;
      let chunkedArray = [];
      let chunk = 4;
      for(i=0, j=0; i < post.length; i += chunk, j++) {
        chunkedArray[j] = post.slice(i, i+chunk);
      }
      return chunkedArray;
    }
  }
});

const vm = new Vue({
    el: '#app',
    data: {
        results: []
    },
    mounted() {
        this.getPost('home');
    },
    methods: {
      getPost(section) {
        let url = buildUrl(section);
        axios.get(url).then((response) => {
          this.results = response.data.results;
        }).catch(error => { console.log(error); });
      }
    }
});