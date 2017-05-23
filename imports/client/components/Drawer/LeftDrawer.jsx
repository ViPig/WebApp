import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

import { hideLeftDrawer } from '../../actions/setLeftDrawerVisible';

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
    backgroundImage: "url('images/drawer-header-background.jpg')",
  },
};

class DrawerUndockedExample extends React.Component {

  handleClose = () => {
    this.props.hideLeftDrawer();
  }

  render() {
    const isShow = this.props;
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
              primaryText="Name"
              secondaryText={
                <p>
                  <span>Email: </span>
                  mail@gmail.com
                </p>
              }
              secondaryTextLines={2}
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
DrawerUndockedExample.propTypes = {
  hideLeftDrawer: PropTypes.func.isRequired,
};
export default connect(null, { hideLeftDrawer })(DrawerUndockedExample);
