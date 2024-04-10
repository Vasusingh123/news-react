import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description,imgurl , newsurl } = this.props;
    return (
      <div className='my-3'>
       <div className="card" >
           <img src={!imgurl?"https://newsapi.org/v2/everything?domains=wsj.com&apiKey=135e3a4a5846493ea19137d7157df39d":imgurl} className="card-img-top" alt="..."/>
      <div className="card-body">
           <h5 className="card-title">{title}...</h5>
           <p className="card-text">{description}...</p>
           <a  rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark"> Browse </a>
     </div>
     </div>
     </div>
    )
  }
}
