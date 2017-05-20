import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

// New libs
import { List, ListItem } from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import SettingsApplications from 'material-ui/svg-icons/action/settings-applications';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import SubdirectoryArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import Subheader from 'material-ui/Subheader';

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
          <List>
            <ListItem primaryText="Home" leftIcon={<ActionHome />} />
          </List>
          <List>
            <Subheader>PRODUCTS</Subheader>
            <ListItem primaryText="Function 1" leftIcon={<KeyboardArrowRight />} />
            <ListItem primaryText="Function 2" leftIcon={<KeyboardArrowRight />} />
            <ListItem primaryText="Function 3" leftIcon={<KeyboardArrowRight />} />
            <ListItem
              primaryText="Function 4"
              leftIcon={<KeyboardArrowRight />}
              nestedItems={[
                <ListItem primaryText="Subfunction 1" leftIcon={<SubdirectoryArrowRight />} />,
                <ListItem primaryText="Subfunction 2" leftIcon={<SubdirectoryArrowRight />} />,
                <ListItem primaryText="Subfunction 3" leftIcon={<SubdirectoryArrowRight />} />,
                <ListItem primaryText="Subfunction 4" leftIcon={<SubdirectoryArrowRight />} />,
              ]}
            />
          </List>
          <List>
            <ListItem primaryText="Account settings" leftIcon={<SettingsApplications />} />
            <ListItem primaryText="Log out" leftIcon={<ExitToApp />} />
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
