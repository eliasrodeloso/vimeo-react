import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import { CircularProgress } from "material-ui/Progress";

const Item = ({ video }) => {
  return (
    <GridListTile className="Tile--margin">
      <img src={video.pictures.sizes[2].link} alt={video.name} />
      <GridListTileBar
        title={
          <Link className="tile-link" to={video.uri}>
            {video.name}
          </Link>
        }
        subtitle={
          <span>
            by:{" "}
            <a className="tile-link" href={video.user.link}>
              {video.user.name}
            </a>{" "}
          </span>
        }
      />
    </GridListTile>
  );
};

class VideoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.List = [];
  }

  componentWillMount() {
    const { videos } = this.props;
    let length = videos.length - 1;
    videos.forEach((video, index) => {
      this.List.push(<Item key={index} video={video} />);
      if (length === index) {
        this.setState({ loaded: true });
      }
    });
  }

  render() {
    return !this.state.loaded ? (
      <CircularProgress className="align-self-center" />
    ) : (
      <GridList
        style={{ margin: "none", marginLeft: -2, marginRight: -2 }}
        cellHeight="auto"
      >
        {this.List}
      </GridList>
    );
  }
}

VideoListPage.propTypes = {
  videos: PropTypes.array
};

export default VideoListPage;
