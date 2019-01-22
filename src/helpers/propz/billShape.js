import PropTypes from 'prop-types';

const billShape = PropTypes.shape({
  payee: PropTypes.string.isRequired,
  dueDate: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  paymentUrl: PropTypes.string.isRequired,
  isPaid: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
});

export default billShape;
