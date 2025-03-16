import React from "react";

const NewsCard = ({ article }) => {
  const data = {};
  return (
    <div className="_news-card">
      <div className="header">
        <div className="date">
          <p>15</p>
          <h1>Dec</h1>
          <p>2024</p>
        </div>
        <h2>{article.title}</h2>
      </div>
      <p>{article.content}</p>
      <a href={article.link}>Read more...</a>
    </div>
  );
};

export default NewsCard;
