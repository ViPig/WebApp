import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Computer from 'material-ui-icons/Computer';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import Contacts from 'material-ui-icons/Contacts';
import Description from 'material-ui-icons/Description';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import Avatar from 'material-ui/Avatar';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { hideLeftDrawer } from '../../actions/setLeftDrawerVisible';
import { onAuthChange } from '../../../routes/routes';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  body: {
    backgroundColor: 'transparent',
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    zIndex: 1000,
  },
  content: {
    flex: 1,
    padding: '2em',
  },
  header_avatar: {
    height: 70,
    width: '100%',
    flex: 1,
    backgroundImage: "url('images/header-background-indexed.png')",
  },
};

const styleSheet = createStyleSheet('DrawerUndocked', {
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
  paper: {
    height: 'calc(100% - 64px)',
    top: 64,
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: 'transparent',
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    zIndex: 1000,
  },
});


class DrawerUndocked extends React.Component {

  handleClose = () => {
    this.props.hideLeftDrawer();
  }
  logout = () => {
    props = this.props;
    Meteor.logout(function() {
      props.logout();
      onAuthChange.signout();
    });
  }
  apitest = () => {
    // console.log('click_apitest');

    Meteor.call('asyncMethods', function(err, res) {
      // console.log(res, 'xxxxres');
    });
  }
  render() {
    const classes = this.props.classes;

    const isShow = this.props;
    // console.log('message', isShow);
    return (
      <div className={styles.body}>
        <Drawer
          docked
          open={isShow.appState.leftDrawer.showLD === undefined ? false : isShow.appState.leftDrawer.showLD}
          onRequestClose={this.handleClose}
          onClick={this.handleClose}
          classes={{
            paper: classes.paper, // className, e.g. `OverridesClasses-root-X`
          }}
          // classes={{ anchorLeft: { height: 'calc(100% - 64px)', top: 64, zIndex: 1000 } }}
        >
          <div>
            <List className={classes.list} disablePadding>
              <div>
                <Link to="/Status">
                  <ListItem button>
                    <ListItemIcon>
                      <Computer />
                    </ListItemIcon>
                    <ListItemText primary="Server Info" />
                  </ListItem>
                </Link>
                <Link to="/Submissions">
                  <ListItem button>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Your Submission" />
                  </ListItem>
                </Link>
              </div>
            </List>

            <Divider />
            <List className={classes.list} disablePadding>
              <div>
                <ListItem button>
                  <ListItemIcon>
                    <Contacts />
                  </ListItemIcon>
                  <ListItemText primary="Contact Us" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="FAQ" />
                </ListItem>
              </div>
            </List>
          </div>
        </Drawer>


        {/* <Drawer
          docked={false}
          overlayStyle={styles.body}
          width={300}
          open={isShow.appState.leftDrawer.showLD === undefined ? false : isShow.appState.leftDrawer.showLD}
          onRequestClose={this.handleClose}
          containerStyle={{ height: 'calc(100% - 64px)', top: 64, zIndex: 1000 }}
        > */}
        {/* <List
            style={styles.header_avatar}
            >
            <ListItem
          disabled
          leftAvatar={
            <Avatar src="images/ok-128.jpg" />
          }
          primaryText={this.props.loading === false ? `${this.props.documents.profile.first_name} ${this.props.documents.profile.last_name}` : 'None'}
          secondaryText={
            <p>
            <span>{this.props.loading === false ? this.props.documents.emails[0].address : 'None'}</span>
            </p>
          }
          secondaryTextLines={2}
          // rightIconButton={
          //   <IconButton
          //     tooltip="Logout"
          //     onTouchTap={this.logout}
          //   >
          //     <DraftsIcon />
          //   </IconButton>
          // }
            />
        </List> */}
        {/* <Divider />
            <List>
            <ListItem primaryText="Inbox" leftIcon={<InboxIcon />} onTouchTap={this.apitest} />
            <ListItem primaryText="Starred" leftIcon={<InboxIcon />} />
            <ListItem primaryText="Sent mail" leftIcon={<InboxIcon />} />
            <ListItem primaryText="Drafts" leftIcon={<InboxIcon />} />
            <ListItem primaryText="Inbox" leftIcon={<InboxIcon />} />
            </List>
            <Divider />
            <List>
            <ListItem primaryText="All mail" rightIcon={<DraftsIcon />} />
            <ListItem primaryText="Trash" rightIcon={<DraftsIcon />} />
            <ListItem primaryText="Spam" rightIcon={<DraftsIcon />} />
            <ListItem primaryText="Follow up" rightIcon={<DraftsIcon />} />
        </List> */}
        {/* </Drawer> */}
      </div>
    );
  }
}
DrawerUndocked.propTypes = {
  hideLeftDrawer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  documents: React.PropTypes.object,
};
function mapDispatchToProps(dispatch) {
  return {
    hideLeftDrawer: () => { dispatch(hideLeftDrawer()); },
    logout: () => { dispatch(logout()); },
  };
}
export default connect(null, mapDispatchToProps)(withStyles(styleSheet)(DrawerUndocked));
