import PropTypes from 'prop-types';

const articleShape = PropTypes.shape({
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
});

export default articleShape;
