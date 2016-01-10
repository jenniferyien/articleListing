var MainDiv = React.createClass({
  getInitialState: function(){
    //state where data will be stored
    return {currentPage: [], pageCount: 0}
  },
  componentDidMount: function(){
    this.ajaxCalls(0)
  },
  ajaxCalls: function(num){
    var pageAmount = num + 10
    //getting two calls to load all articles needed
    $.ajax({
      url: './data/articles.json',
      method: 'GET',
      datatype: 'JSON',
      success: function(data, status, xhr){
        //needs to parse through json data
        var articles = JSON.parse(data)
        var displays = [];
        if(num < articles.length){
          for(var i = num; i < pageAmount; i++){
              displays.push(articles[i])
          }
        } else {
          $.ajax({
            url: './data/more-articles.json',
            method: 'GET',
            datatype: 'JSON',
            async: false,
            success:function(data, status, xhr){
              //needs to parse through json data
              var moreArticles = JSON.parse(data);
              for(var i = (num-30); i < (pageAmount-30); i++){
                  displays.push(moreArticles[i])
              }
            },
            error: function(xhr, status, error){
              console.log('second ajax', error)
            }
          }); //ajax
        }
        this.setState({currentPage: displays})
      }.bind(this),
      error: function(xhr, status, error){
        console.log('ajax error', error)
      }
    }); //ajax

  },
  more: function(){
    var next = this.state.pageCount + 10
    this.setState({pageCount: next})
    this.ajaxCalls(next)
  },
  prev: function(){
    var prev = this.state.pageCount - 10;
    console.log(this.state.pageCount)
    this.setState({pageCount: prev})
    this.ajaxCalls(prev)
  },
  wordSortL: function(){
    var leastFirst = this.state.currentPage.sort(function(a,b){
			return (a.words - b.words)
		});
    this.setState({currentPage: leastFirst})
  },
  wordSortM: function(){
    var mostFirst = this.state.currentPage.sort(function(a,b){
      return (b.words - a.words)
    });
    this.setState({currentPage: mostFirst})
  },
  // sortDate: function(){
  //   var date = this.currentPage.sort(function(a,b){
  //     var c = new Date(a.publish_at).getTime();
  //     var d = new Date(b.publish_at).getTime();
  //     return c-d;
  //   });
  //   this.setState({currentPage: date})
  // },
  render: function(){
    var article = this.state.currentPage.map(function(item){
      return (
        <ul>
          <li>image: {item.image}</li>
          <li>url: {item.url}</li>
          <li>title: {item.title}</li>
          <li>author: {item.profile.first_name} {item.profile.last_name}</li>
          <li>words: {item.words}</li>
          <li>submitted: {item.publish_at}</li>
        </ul>
      )
    });
    return (
      <div>
      <button onClick={this.prev}>Prev</button>
      <button onClick={this.more}>Next</button>
      <button onClick={this.wordSortL}>words sorting L to M</button>
      <button onClick={this.wordSortM}>words sorting M to L</button>
      <button onClick={this.sortDate}>date sort</button>
      <h2> Hello </h2>
      <div>{article}</div>
      </div>
    )
  }
});


React.render(< MainDiv />, document.body);
