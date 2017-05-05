import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
DrawerUndockedExample.propTypes = {
  hideLeftDrawer: PropTypes.func.isRequired,
};
export default connect(null, { hideLeftDrawer })(DrawerUndockedExample);
