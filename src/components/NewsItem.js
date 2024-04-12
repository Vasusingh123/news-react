import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description,imgurl , newsurl ,author ,date, source} = this.props;
    return (
      <div className='my-3'>
        
       <div className="card" >
       <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:"1", left: '90%'}}>
        {source}
    <span className="visually-hidden">unread messages</span>
  </span>
           <img src={!imgurl?"https://newsapi.org/v2/everything?domains=wsj.com&apiKey=135e3a4a5846493ea19137d7157df39d":imgurl} className="card-img-top" alt="..."/>
       <div className="card-body">
           <h5 className="card-title">{title}...</h5>
           <p className="card-text">{description}... <span className="badge text-bg-success">Success</span></p>
           <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown" : author} On : {new Date(date).toGMTString()}</small></p>
           <a  rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark"> Browse </a>
     </div>
     </div>
     </div>
    )
  }
}
