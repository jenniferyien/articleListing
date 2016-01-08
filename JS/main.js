var MainDiv = React.createClass({
  getInitialState: function(){
    return {articleData: []}
  }
  componentDidMount: function(){
    $.ajax({
      url: './data/articles.json',
      method: 'GET',
      datatype: 'JSON',
      success: function(data, status, xhr){
        var articles = JSON.parse(data)
        console.log(articles.length)
      }
    })
  },
  render: function(){
    return (
      <h2>Hello</h2>
    )
  }
});


React.render(< MainDiv />, document.body);
