import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultPorps = {
    country: "all countries",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  componentDidMount() {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d7d509b7bcc6409ab1b9f17f4cd1d31e&page=1&pageSize=${this.props.pageSize}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            articles: result.articles,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  handlePrevClick = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=d7d509b7bcc6409ab1b9f17f4cd1d31e&page=${
        this.state.page - 1
      }&pageSize = ${this.props.pageSize}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState((prevState) => ({
            page: prevState.page - 1,
            articles: result.articles,
          }));
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };
  handleNextClick = () => {
    console.log("next");
    if (Math.ceil(this.state.totalResults / this.props.pageSize)) {
    } else {
      fetch(
        `https://newsapi.org/v2/top-headlines?country=${
          this.props.country
        }&category=${
          this.props.category
        }&apiKey=d7d509b7bcc6409ab1b9f17f4cd1d31e&page=${
          this.state.page + 1
        }&pageSize=${this.props.pageSize}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState((prevState) => ({
              page: prevState.page + 1,
              articles: result.articles,
            }));
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  };

  render() {
    return (
      <div className="container my-3">
        <strong>
          <h2 className="text-center" style={{color: "#00ff0a"}}>Welcome to <strong>Kemish bajgai's</strong> news portal.</h2>
          <span style={{marginLeft: "230px", color: "brown"}}>Plase select any particular news category you want to know about above in the News reference above. Choose science if you want to get info. related to science. Likewise choose entertainment for news related to movies, glamour, music and so on.We will be updating latest informations about the particular catergory you click.</span>
          
        </strong>
        <div className="row my-5">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 49) : ""}
                  description={
                    element.description ? element.description.slice(0, 110) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source = {element.source.id}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-success"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-success"
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
