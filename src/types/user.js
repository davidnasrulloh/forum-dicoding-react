import PropTypes from "prop-types";

export const userTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	email: PropTypes.string,
	avatar: PropTypes.string.isRequired,
};
