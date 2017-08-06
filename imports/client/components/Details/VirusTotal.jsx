import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

const styleSheet = createStyleSheet(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  list_result: {
    color: 'red',
  },
}));


class VirusTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
    };
  }
  handleRequestClose = () => {
    this.setState({ open: false });
  };

  detailItem = (key) => {
    this.setState({ open: true, title: key });
  }
  render() {
    const classes = this.props.classes;
    if (!this.props.virustotal.virustotal.scans) {
      return (
        <div>Nothing</div>
      );
    }
    const virustotal = this.props.virustotal.virustotal;

    return (
      <Grid fluid>
        <Row>
          {Object.keys(virustotal.scans).map(key =>
            <Col xs={12} sm={12} md={4} lg={4} key={key}>
              <ListItem dense button onTouchTap={() => this.detailItem(key)}>
                <ListItemText primary={key} />
                {/* <ListItemText primary={virustotal.scans[key].result} classes={{ text: classes.list_result }} /> */}
                <ListItemSecondaryAction>
                  <IconButton>
                    {virustotal.scans[key].detected ? <Icon color="error">error</Icon> : <Icon style={{ color: '#00E676' }}>check_circle</Icon> }
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Col>,
          )}
        </Row>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <ListItem dense>
                <ListItemText primary="Version" />
                <ListItemText primary={this.state.title && virustotal.scans[this.state.title].version} />
              </ListItem>
              <ListItem dense>
                <ListItemText primary="Result" />
                <ListItemText primary={this.state.title && virustotal.scans[this.state.title].result} />
              </ListItem>
              <ListItem dense>
                <ListItemText primary="Update" />
                <ListItemText primary={this.state.title && virustotal.scans[this.state.title].update} />
              </ListItem>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>

    );
  }

}

export default withStyles(styleSheet)(VirusTotal);
