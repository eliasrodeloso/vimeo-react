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
            </a>
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
      list: []
    };
  }

  componentWillMount() {
    const { videos } = this.props;
    let arr = [];
    videos.forEach((video, index) => {
      arr.push(<Item key={index} video={video} />);
      this.setState({
        list: arr
      });
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
        {this.state.list}
      </GridList>
    );
  }
}

VideoListPage.propTypes = {
  videos: PropTypes.array
};

export default VideoListPage;
