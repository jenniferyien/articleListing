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
  render: function(){
    var article = this.state.currentPage.map(function(item){
      return (
        <li>{item.title}</li>
      )
    });
    return (
      <div>
      <button onClick={this.more}>Next</button>
      <h2>Hello </h2>
      <div>{article}</div>
      </div>
    )
  }
});


React.render(< MainDiv />, document.body);
