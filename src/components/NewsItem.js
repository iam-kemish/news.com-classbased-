import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl? "https://media.zenfs.com/en/the_week_574/97aca84176b79fe893817bc3f01feaf2": imageUrl } className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}...{" "}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                {!source?"not published": source}
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small>
                By {!author ? "unknown" : author} on {date}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
