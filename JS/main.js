var MainDiv = React.createClass({
  getInitialState: function(){
    //state where data will be stored
    return {articlesData: [], currentPage: [], pageCount: 0, noMore: false, noLess: true}
  },
  componentDidMount: function(){
    this.ajaxCalls()
  },
  ajaxCalls: function(){
    //getting two calls to load all articles needed
    $.ajax({
      url: './data/articles.json',
      method: 'GET',
      datatype: 'JSON',
      success: function(data, status, xhr){
        //needs to parse through json data
        var articles = JSON.parse(data)
        //data for all Articles
        var dataReading = [];
        //data for initial article display
        var displays = [];
        //adding first ajax article load to dataReading
        for(var i = 0; i < articles.length; i++){
            dataReading.push(articles[i])
        }
        //picking out only first 10 articles for display
        for (var i = 0; i< 10; i++){
          displays.push(articles[i])
        }
        //false async so ajax must be completed before moving forward
        $.ajax({
          url: './data/more-articles.json',
          method: 'GET',
          datatype: 'JSON',
          async: false,
          success:function(data, status, xhr){
            //needs to parse through json data
            var moreArticles = JSON.parse(data);
            //adding all article data in json to the dataReading file
            for(var i = 0; i < moreArticles.length; i++){
                dataReading.push(moreArticles[i])
            }
          },
          error: function(xhr, status, error){
            console.log('second ajax', error)
          }
        }); //ajax
        //setting state for all other data states
        this.setState({currentPage: displays, articlesData: dataReading})
      }.bind(this),
      error: function(xhr, status, error){
        console.log('ajax error', error)
      }
    }); //ajax
  },
  more: function(){
    //taking current page count
    //increment by 10 articles per page
    var next = this.state.pageCount + 10;
    //if there are no more articles to view change state noMore to true
    if((next + 10) == this.state.articlesData.length){
      this.articleDisplay(next)
      this.setState({pageCount: next, noMore: true, noLess: false})
    } else {
      this.articleDisplay(next)
      this.setState({pageCount: next, noMore: false, noLess: false})
    }
  },
  prev: function(){
    //taking page number and decreasing it
    var prev = this.state.pageCount - 10;
    // if there are no more previous change state noLess to true
    if(prev == 0){
      this.articleDisplay(prev)
      this.setState({pageCount: prev, noLess: true, noMore: false})
    } else {
      this.articleDisplay(prev)
      this.setState({pageCount: prev, noLess: false, noMore: false})
    }
  },
  articleDisplay: function(num){
    var view = [];
    //takes number given has first index and increment by 10 per article page
    for(var i = num; i < (num + 10); i++){
      view.push(this.state.articlesData[i]);
    }
    this.setState({currentPage: view})
  },
  wordSortL: function(){
    //sort through all article listing
    var leastFirst = this.state.articlesData.sort(function(a,b){
			return (a.words - b.words)
		});
    //change state
    this.setState({articlesData: leastFirst})
    this.articleDisplay(this.state.pageCount)
  },
  wordSortM: function(){
    //sort through all article listing
    var mostFirst = this.state.articlesData.sort(function(a,b){
      return (b.words - a.words)
    });
    //change state
    this.setState({articlesData: mostFirst})
    this.articleDisplay(this.state.pageCount)
  },
  sortDateNew: function(){
    var date = this.state.articlesData.sort(function(a,b){
      var c = new Date(a.publish_at);
      var d = new Date(b.publish_at);
      return c-d;
    });
    this.setState({articlesData: date})
    this.articleDisplay(this.state.pageCount)
  },
  sortDateOld: function(){
    var date = this.state.articlesData.sort(function(a,b){
      var c = new Date(a.publish_at);
      var d = new Date(b.publish_at);
      return d-c;
    });
    this.setState({articlesData: date})
    this.articleDisplay(this.state.pageCount)
  },
  render: function(){
    if(this.state.noMore == true){
      var buttons =
        <div>
          <button onClick={this.prev}>Prev</button>
        </div>
    } else if (this.state.noLess == true) {
      var buttons =
        <div>
          <button onClick={this.more}>Next</button>
        </div>
    } else {
      var buttons =
        <div>
          <button onClick={this.prev}>Prev</button>
          <button onClick={this.more}>Next</button>
        </div>
    }
    var article = this.state.currentPage.map(function(item){
      //if i wante hours and min (HH:mm)
      var displayTime = moment(item.publish_at).format('L');
      var date = moment(item.publish_at).fromNow();
      return (
        <ul>
          <li>image: {item.image}</li>
          <li>url: {item.url}</li>
          <li>title: {item.title}</li>
          <li>author: {item.profile.first_name} {item.profile.last_name}</li>
          <li>words: {item.words}</li>
          <li>submitted: {date} on {displayTime}</li>
        </ul>
      )
    });
    return (
      <div>
      <div>{buttons}</div>
      <button onClick={this.wordSortL}>words sorting L to M</button>
      <button onClick={this.wordSortM}>words sorting M to L</button>
      <button onClick={this.sortDateNew}>date sort Newer</button>
      <button onClick={this.sortDateOld}>date sort Older</button>
      <h2> Hello </h2>
      <div>{article}</div>
      </div>
    )
  }
});


React.render(< MainDiv />, document.body);
