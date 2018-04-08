import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import List from "material-ui/List";
import { CircularProgress } from "material-ui/Progress";
import { withRouter } from "react-router";

import Item from "./Item";
import { setActiveCategory } from "../../store/actions/category.actions";

const mapDispatchToProps = dispatch => ({
  setActiveCategory: category => dispatch(setActiveCategory(category))
});

const mapStateToProps = state => ({
  activeCategory: state.category
});

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.Categories = [];
  }

  componentDidMount() {
    const { axios, location } = this.props;
    axios.get("/categories").then(response => {
      if (response.status === 200) {
        response.data.data.forEach((category, index) => {
          this.Categories.push(
            <Item key={index} index={index} category={category} />
          );
          if (Object.keys(this.props.activeCategory).length === 0) {
            if (location.pathname === category.uri) {
              this.props.setActiveCategory(category);
            } else {
              if (index === 0 && location.pathname === "/") {
                this.props.setActiveCategory(category);
              }
            }
          }
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
  axios: PropTypes.func.isRequired,
  mapStateToProps: PropTypes.object,
  mapDispatchToProps: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoriesList)
);
