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
        return (<h6 className="text-center">There are no articles related to this category.</h6>);
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
      <div className="col-5 articles">
        <h4 className="text-center">Articles</h4>
        {checkLength()}
        {articlesItemComponents}
      </div>
    );
  }
}

export default Articles;
