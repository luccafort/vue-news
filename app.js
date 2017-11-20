const Domain  = 'api.nytimes.com';
const BasePath = '/svc/topstories/v2/';
const API_KEY = 'a409a682764b45a0aaa15393c66bf8ca';

function buildUrl(url) {
  return 'https://' + Domain + BasePath + url + '.json?api_key=' + API_KEY;
}

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
    },
    computed: {
      // resultsが変更されるたびに呼び出されて画像の取得とResultsを4つにまとめる処理が実行される
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