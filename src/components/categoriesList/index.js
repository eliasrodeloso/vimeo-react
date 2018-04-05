import React from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import { CircularProgress } from "material-ui/Progress";
import Category from "./Category";

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.Categories = [];
  }

  componentWillMount() {
    const { axios } = this.props;
    axios.get("/categories").then(response => {
      if (response.status === 200) {
        response.data.data.forEach((category, index) => {
          this.Categories.push(
            <Category key={index} index={index} category={category} />
          );
        });
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return this.state.loading ? (
      <CircularProgress className="align-self-center" />
    ) : (
      <List component="nav">{this.Categories}</List>
    );
  }
}

CategoriesList.propTypes = {
  axios: PropTypes.func.isRequired
};

export default CategoriesList;
