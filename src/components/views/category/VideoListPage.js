import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";

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
    this.List = [];
  }

  componentWillMount() {
    const { videos } = this.props;
    videos.forEach((video, index) => {
      this.List.push(<Item key={index} video={video} />);
    });
  }

  render() {
    return (
      <GridList
        spacing={18}
        style={{
          margin: "none",
          marginLeft: -2,
          marginRight: -2,
          marginBottom: 0
        }}
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
