var app = new Vue({
    el: '#vueapp',
    data () {
      return {
        items:null,
        search:'',
        page:1,
        per_page:10,
        rows:0,
        no_data:false,
        queried:false,
        pageSearch:'',
        apiRateExceeded:false
      }
    },
    methods:{
      onclick: function (url) {   
          window.open(url, "_blank");    
      },
      onSearchClickButton: function(){
        if(this.search != ''){
          fetch('https://api.github.com/search/repositories?page=' + this.page + '&per_page='+ this.per_page + '&q=' + this.search + '&sort=stars&order=desc')
          .then(response => response.json())
          .then(json => {
              this.items = json.items
              //GitHub API only allows up to 1k searches
              if(json.total_count > 1000){
                this.rows = 1000
                this.no_data = false;
              }
              else if(json.total_count < 1000 && json.total_count > 0){
                this.rows = json.total_count
                this.no_data = false;
              }
              else{
                this.no_data = true;
              }
              
              if(json.message){
                if(json.message.includes("API rate limit exceeded")){
                  this.apiRateExceeded = true;
                }
              }
              else
                this.apiRateExceeded = false;
              
              this.queried = true;
              this.pageSearch = this.search;
              this.page = 1;
          });
        }
        else if(this.search == ''){
          alert("Please key in a search value");
        }
      },
      onSearchClickPage: function(){
          fetch('https://api.github.com/search/repositories?page=' + this.page + '&per_page='+ this.per_page + '&q=' + this.pageSearch + '&sort=stars&order=desc')
          .then(response => response.json())
          .then(json => {
              this.items = json.items
              //GitHub API only allows up to 1k searches
              if(json.total_count > 1000){
                this.rows = 1000
              }
              else if(json.total_count < 1000 && json.total_count > 0){
                this.rows = json.total_count
              }
              this.search = this.pageSearch;
          });
      }
    }
  })

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('dddd MMM DD YYYY')
  }
});