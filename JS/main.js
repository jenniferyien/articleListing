var MainDiv = React.createClass({
  getInitialState: function(){
    return {articleData: []}
  },
  componentDidMount: function(){
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
    })
  },
  render: function(){
    console.log(this.state.articleData.length)
    var article = this.state.articleData.map(function(item){
      return (
        <li>{item.title}</li>
      )
    });
    return (
      <div>
      <h2>Hello </h2>
      <div>{article}</div>
      </div>
    )
  }
});


React.render(< MainDiv />, document.body);
