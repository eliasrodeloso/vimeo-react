import React from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import { CircularProgress } from "material-ui/Progress";

import Item from "./Item";

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.Categories = [];
  }

  render() {
    return this.state.loading ? (
      <CircularProgress className="align-self-center" />
    ) : (
      <List component="nav">{this.Categories}</List>
    );
  }
}

CategoriesList.propTypes = {};

export default CategoriesList;
