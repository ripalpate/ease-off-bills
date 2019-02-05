import React from 'react';
import PropTypes from 'prop-types';
import articleShape from '../../helpers/propz/articlesShape';
import ArticleItem from '../ArticleItem/ArticleItem';
import './Articles.scss';

class Articles extends React.Component {
  static propTypes = {
    articles: PropTypes.arrayOf(articleShape),
  }

  render() {
    const { articles } = this.props;
    const checkLength = () => {
      if (articles.length === 0) {
        return (<h5 className="text-center no-article-message">There are no articles related to this category.</h5>);
      }
      return (<span></span>);
    };

    const articlesItemComponents = articles.map(article => (
      <ArticleItem
      article={article}
      key={article.id}
      />
    ));
    return (
      <div className=" col articles">
        <h4 className="text-center">Resources</h4>
        {checkLength()}
        <div className="outerDiv">
          <div className= "innerDiv">
            <div className="articlesWrapper row">{articlesItemComponents}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Articles;
