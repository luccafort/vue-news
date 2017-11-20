const Domain  = 'api.nytimes.com';
const BasePath = '/svc/topstories/v2/';
const API_KEY = 'YOUR-API-KEY';

function buildUrl(url) {
  return 'https://' + Domain + BasePath + url + '.json?api_key=' + API_KEY;
}

const vm = new Vue({
    el: '#app',
    data: {
        results: []
    },
    mounted(){
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