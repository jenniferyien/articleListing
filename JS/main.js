var MainDiv = React.createClass({
  getInitialState: function(){
    return {articleData: [], secondArticleSet: [], currentPage: [], pageCount: 0}
  },
  componentDidMount: function(){
    //getting two calls to load all articles needed
    $.ajax({
      url: './data/articles.json',
      method: 'GET',
      datatype: 'JSON',
      success: function(data, status, xhr){
        var articles = JSON.parse(data)
        this.setState({articleData: articles})
      }.bind(this),
      error: function(xhr, status, error){
        console.log('ajax error', error)
      }
    }); //ajax

    $.ajax({
      url: './data/more-articles.json',
      method: 'GET',
      datatype: 'JSON',
      success:function(data, status, xhr){
        var moreArticles = JSON.parse(data);
        this.setState({secondArticleSet: moreArticles})
      }.bind(this),
      error: function(xhr, status, error){
        console.log('second ajax', error)
      }
    }); //ajax

  },
  displayLimit: function(next){
    var page = 0;
    if(typeof next == 'number'){
      page = next
    };
    var pageAmount = page + 10
    var article = this.state.articleData
    var count = this.state.articleData.length
    var displays = [];
    for(var i = page; i < pageAmount; i++){
        displays.push(article[i])
    }
    this.setState({currentPage: displays})
  },
  more: function(){
    var next = this.state.pageCount + 10
    this.setState({pageCount: next})
    this.displayLimit(next)
  },
  render: function(){
    console.log(this.state.currentPage.length)
    var article = this.state.currentPage.map(function(item){
      return (
        <li>{item.title}</li>
      )
    });
    return (
      <div>
      <button onClick={this.displayLimit}>click</button>
      <button onClick={this.more}>Next</button>
      <h2>Hello </h2>
      <div>{article}</div>
      </div>
    )
  }
});


React.render(< MainDiv />, document.body);
