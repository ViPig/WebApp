import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
}));

class Video extends Component {
  render() {
    return (
      <div>das</div>
    );
  }
}

export default withStyles(styleSheet)(Video);
