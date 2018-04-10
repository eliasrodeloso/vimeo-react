import React from "react";
import PropTypes from "prop-types";

class CategoryContainer extends React.Component {
  render() {
    return <div>CategoryContainer</div>;
  }
}

CategoryContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default CategoryContainer;
