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
// From NYTimes
const SECTIONS = "home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, world";

const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        // カンマ区切りのセクションを配列に変換してセット
        sections: SECTIONS.split(', '),
        // セクションのデフォルト値をセット
        section: 'home',
    },
    mounted() {
        this.getPost(this.section);
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