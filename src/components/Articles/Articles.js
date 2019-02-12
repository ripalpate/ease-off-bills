import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
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

    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       dots: true,
      //     },
      //   },
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       initialSlide: 1,
      //     },
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //     },
      //   },
      // ],
    };

    const articlesItemComponents = articles.map((article, index) => (
      <ArticleItem
      article={article}
      key={article.id}
      data-index={index}
      />
    ));
    return (
      <div className="articleWrapper">
        <div className="col articles">
          <h4 className="text-center heading pt-3">Resources</h4>
          {checkLength()}
              <div className="articlesWrapper">
              <Slider {...settings}>
              {articlesItemComponents}</Slider>
              </div>
        </div>
      </div>
    );
  }
}

export default Articles;
