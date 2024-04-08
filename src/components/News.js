import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  
  constructor()
  {
    super();
    this.state={
      articles : [],
      loading : false,
      page :0
    }
  }
  componentDidMount = async()=>{
    let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-03-08&sortBy=publishedAt&apiKey=135e3a4a5846493ea19137d7157df39d&pagesize=20`;
    let data= await fetch(url);
    let parseddata=await data.json();
    this.setState({
     
      articles:parseddata.articles
     })
  }
  
  prevfun = async()=>{
    let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-03-08&sortBy=publishedAt&apiKey=135e3a4a5846493ea19137d7157df39d&page=${this.state.page-1}&pagesize=20`;
    let data= await fetch(url);
    let parseddata=await data.json();
   this.setState({
    page:this.state.page-1,
    articles:parseddata.articles
   })
  }
  nextfun = async()=>{
    let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-03-08&sortBy=publishedAt&apiKey=135e3a4a5846493ea19137d7157df39d&page=${this.state.page+1}&pagesize=20`;
    let data= await fetch(url);
    let parseddata=await data.json();
    this.setState({
      page:this.state.page+1,
      articles:parseddata.articles
     })
   }
   
  render() {
   
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  description={(element.description!=='[Removed]')&& element.description?element.description.slice(0,88):"This page id being empty"} title={(element.title!=='[Removed]')&& element.title?element.title.slice(0,44):"This page is empty"} imgurl={element.urlToImage ? element.urlToImage:"https://static.toiimg.com/thumb/msid-109085602,imgsize-118244,width-400,resizemode-4/109085602.jpg"} newsurl={element.url} />        
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
