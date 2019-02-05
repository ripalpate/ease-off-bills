import React from 'react';
import articleShape from '../../helpers/propz/articlesShape';
import './ArticleItem.scss';

class ArticleItem extends React.Component {
  static propTypes = {
    article: articleShape,
  }

  render() {
    const { article } = this.props;
    return (
      <div className="card border-secondary single-article-card mb-3">
        <div className="img-holder">
        <img className="card-img-top article-image" src={article.imgUrl} alt="energy-clip"></img>
        </div>
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.synopsis}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="mr-3">Read more</a>
        </div>
      </div>
    );
  }
}

export default ArticleItem;
