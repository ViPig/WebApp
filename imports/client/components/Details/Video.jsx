import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ReactJWPlayer from 'react-jw-player';
import { Grid, Row, Col } from 'react-flexbox-grid';

const styleSheet = createStyleSheet(theme => ({

}));

class Video extends Component {
  render() {
    console.log(this.props.task_id);
    const task_id = this.props.task_id;
    const video_id = `http://42.112.213.85/tasks/screenrecord/${task_id}.mp4`;
    return (
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <ReactJWPlayer
              className="text-center"
              playerId="video-tasks"
              licenseKey="xg65sRlUcKy28l2k9pL3d9huwgYqrfadBV4LIQ=="
              playerScript={JWPLAYER}
              file={video_id}
            />
          </Row>
        </Col>
      </Row>

    );
  }
}

export default withStyles(styleSheet)(Video);
