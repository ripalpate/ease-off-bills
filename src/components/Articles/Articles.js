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
    const articlesItemComponents = articles.map(article => (
      <ArticleItem
      article={article}
      key={article.id}
      />
    ));
    return (
      <div className="col">
        <h4 className="text-center">Articles</h4>
        {articlesItemComponents}
      </div>
    );
  }
}

export default Articles;
