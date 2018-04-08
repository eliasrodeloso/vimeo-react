import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import List from "material-ui/List";
import { CircularProgress } from "material-ui/Progress";

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
    const { axios } = this.props;
    axios.get("/categories").then(response => {
      if (response.status === 200) {
        response.data.data.forEach((category, index) => {
          this.Categories.push(
            <Item key={index} index={index} category={category} />
          );
          if (index === 0) {
            if (Object.keys(this.props.activeCategory).length === 0) {
              this.props.setActiveCategory(category);
            }
          }
        });
        this.setState({ loading: false });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
    }
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
  mapDispatchToProps: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
