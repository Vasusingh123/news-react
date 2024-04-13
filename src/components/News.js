import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general",
  };
  static propsTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
  cap =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `${this.cap(this.props.category)} - NewsMonkey`;
  }
  
  async pro() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=135e3a4a5846493ea19137d7157df39d&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
  }

  componentDidMount = async () => {
    this.setState({ page: this.state.page });
    this.pro();
  };

  prevfun = async () => {
    this.setState({ page: this.state.page - 1 });
    this.pro();
  };

  nextfun = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pagesize)
      )
    ) {
      this.setState({ page: this.state.page + 1 });
      this.pro();
    }
  };
  fetchMoreData = async() => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=135e3a4a5846493ea19137d7157df39d&page=${this.state.page}&pagesize=${this.props.pagesize}`;
   
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
     
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.cap(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner/></h4>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    description={
                      element.description !== "[Removed]" && element.description
                        ? element.description.slice(0, 88)
                        : "This page id being empty"
                    }
                    title={
                      element.title !== "[Removed]" && element.title
                        ? element.title.slice(0, 44)
                        : "This page is empty"
                    }
                    imgurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static.toiimg.com/thumb/msid-109085602,imgsize-118244,width-400,resizemode-4/109085602.jpg"
                    }
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    );
  }
}
