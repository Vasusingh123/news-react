import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description,imgurl , newsurl } = this.props;
    return (
      <div className='my-3'>
       <div className="card" style={{width:"18rem"}}>
           <img src={!imgurl?"https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_675,q_auto:good,w_1200/cms/uploads/wq0rqdi36zotj6akl00b":imgurl} className="card-img-top" alt="..."/>
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
