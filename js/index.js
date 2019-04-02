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
        queried:false
      }
    },
    methods:{
      onclick: function (url) {   
          window.open(url, "_blank");    
      },
      onSearchClick: function(){
        if(this.search != ''){
          fetch('https://api.github.com/search/repositories?page=' + this.page + '&per_page='+ this.per_page + '&q=' + this.search + '&sort=stars&order=desc')
          .then(response => response.json())
          .then(json => {
              this.items = json.items
              //GitHub API only allows up to 1k searches
              if(json.total_count > 1000){
                this.rows = 1000
                this.no_data = false;
                this.queried = true;
              }
              else if(json.total_count < 1000 && json.total_count > 0){
                this.rows = json.total_count
                this.no_data = false;
                this.queried = true;
              }
              else{
                this.no_data = true;
                this.queried = true;
              }
          });
        }
        else if(this.search == ''){
          alert("Please key in a search value");
        }
    }
    }
  })

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('dddd MMM DD YYYY')
  }
});