import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  
  constructor()
  {
    super();
    this.state={
      articles : [],
      loading : false,
      page :1
    }
  }
  async componentDidMount (){
     let url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=135e3a4a5846493ea19137d7157df39d";
     let data= await fetch(url);
     let parseddata=await data.json();
     console.log(parseddata); 
     this.setState({
      articles:parseddata.articles
     })
  }
  prevfun = ()=>{
   console.log("prev");
  }
  nextfun = ()=>{
    console.log("next");
   }
  render() {

    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  description={element.description?element.description.slice(0,88):""} title={element.title?element.title.slice(0,44):""} imgurl={element.urlToImage} newsurl={element.url} />        
            </div> 
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prevfun}>&larr;Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.nextfun}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}
