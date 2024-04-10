import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps={
    country: "in",
    pagesize:8,
    category: "general"
  }
  static propsTypes ={
    country : PropTypes.string,
     pagesize : PropTypes.number,
      category : PropTypes.string,
  }
 
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
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=135e3a4a5846493ea19137d7157df39d&page=1&pagesize=${this.props.pagesize}`;
    this.setState({
      loading:true
    })
    let data= await fetch(url);
    let parseddata=await data.json();
    this.setState({
      
      articles:parseddata.articles,
      totalResults:parseddata.totalResults, 
      loading:false
     })
     console.log(parseddata);
  }
  
  prevfun = async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=135e3a4a5846493ea19137d7157df39d&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
    this.setState({
      loading:true
    })
    let data= await fetch(url);
    let parseddata=await data.json();
   this.setState({
    page:this.state.page-1,
    articles:parseddata.articles,
    loading:false
   })
  }
  nextfun = async()=>{
    if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pagesize)))
   {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=135e3a4a5846493ea19137d7157df39d&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    this.setState({
      loading:true
    })
    let data= await fetch(url);
    let parseddata=await data.json();
    this.setState({
      page:this.state.page+1,
      articles:parseddata.articles,
      loading:false
     })
    }
   }
   
  render() {
   
    return (
      <div className='container my-3'>
    
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {(this.state.loading && <Spinner/>)}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  description={(element.description!=='[Removed]')&& element.description?element.description.slice(0,88):"This page id being empty"} title={(element.title!=='[Removed]')&& element.title?element.title.slice(0,44):"This page is empty"} imgurl={element.urlToImage ? element.urlToImage:"https://static.toiimg.com/thumb/msid-109085602,imgsize-118244,width-400,resizemode-4/109085602.jpg"} newsurl={element.url} />        
            </div> 
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prevfun}>&larr;Previous</button>
        <button  disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pagesize)}type="button" className="btn btn-dark" onClick={this.nextfun}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}
