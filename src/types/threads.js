import PropTypes from "prop-types";
import { userTypes } from "./user";

export const threadItemTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
	downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
	totalComments: PropTypes.number.isRequired,
	threadOwner: PropTypes.shape(userTypes).isRequired,
};
