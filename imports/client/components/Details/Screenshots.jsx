import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Lightbox from 'react-image-lightbox';


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


class Screenshots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: '',
      isOpen: false,
    };
  }
  createNumber = (n) => {
    n = Number(n);
    if (n === 0) {
      n = 1;
    }
    if (n < 10) {
      return (`000${n.toString()}`);
    } else if (n < 100) {
      return (`00${n.toString()}`);
    } else if (n < 1000) {
      return (`0${n.toString()}`);
    }


    return (n);
  }
  handleImageClick = (image_id) => {
    this.setState({ isOpen: true, photoIndex: image_id });
  }
  render() {
    const classes = this.props.classes;
    const screenshots = this.props.screenshots;
    const task_id = this.props.task_id;
    const image_length = screenshots.length;
    const self = this;
    const { photoIndex, isOpen } = this.state;
    return (
      <div className={classes.container}>
        <GridList cellHeight={300} className={classes.gridList}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }} />
          {screenshots.map((key, index) => {
            const image_id = this.createNumber(index + 1);
            return (
              <GridListTile key={image_id.toString()} onTouchTap={() => this.handleImageClick(image_id)}>
                <img src={`${SCREENSHOTS}/${task_id}/${image_id}`} alt={image_id.toString()} />
                <GridListTileBar
                  title={`Image: ${image_id.toString()}`}
                />
              </GridListTile>
            );
          },
          )}
        </GridList>
        {isOpen &&
          <Lightbox
            mainSrc={`${SCREENSHOTS}${task_id}/${photoIndex}`}
            nextSrc={`${SCREENSHOTS}${task_id}/${this.createNumber((Number(photoIndex) + 1) % image_length)}`}
            prevSrc={`${SCREENSHOTS}${task_id}/${this.createNumber((Number(photoIndex) - 1) % image_length)}`}

            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => this.setState({
              photoIndex: this.createNumber((Number(photoIndex) + image_length - 1) % image_length),
            })}
            onMoveNextRequest={() => this.setState({
              photoIndex: this.createNumber((Number(photoIndex) + 1) % image_length),
            })}
          />
        }
      </div>
    );
  }
}

export default withStyles(styleSheet)(Screenshots);
