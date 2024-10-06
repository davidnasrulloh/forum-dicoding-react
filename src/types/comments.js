import PropTypes from "prop-types";
import { userTypes } from "./user";

export const commentTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	owner: PropTypes.shape(userTypes).isRequired,
	upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
	downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};
