import PropTypes from 'prop-types';

export const userDto = PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
});