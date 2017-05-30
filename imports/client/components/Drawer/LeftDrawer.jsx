import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';

import { hideLeftDrawer } from '../../actions/setLeftDrawerVisible';
import { logout } from '../../actions/setLoginState';
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
  render() {
    const isShow = this.props;
    console.log('message', isShow);
    return (
      <div className={styles.body}>
        <Drawer
          docked={false}
          overlayStyle={styles.body}
          width={300}
          open={isShow.appState.leftDrawer.showLD === undefined ? false : isShow.appState.leftDrawer.showLD}
          onRequestChange={this.handleClose}
          containerStyle={{ height: 'calc(100% - 64px)', top: 64, zIndex: 1000 }}
        >
          <List
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
              rightIconButton={
                <IconButton
                  tooltip="Logout"
                  onTouchTap={this.logout}
                >
                  <ActionExitToApp />
                </IconButton>
              }
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
            <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
          </List>
        </Drawer>
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
export default connect(null, mapDispatchToProps)(DrawerUndocked);
