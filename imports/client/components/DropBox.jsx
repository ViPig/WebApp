import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import i18n from 'meteor/universe:i18n';

import { showProcessModal, hideProcessModal } from '../actions/showProcessingModal';
import Store from '../store/store';

import DialogProcess from './Dialogs/CalculateHash';

const T = i18n.createComponent(i18n.createTranslator());

const styles = {
  button: {
    margin: 12,
  },
};
const style = {
  height: 200,
  // width: 300,
  textAlign: 'center',
};
const dropBoxStyle = {
  height: 150,
  width: '80%',
  textAlign: 'center',
};

class DropBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: '',
      files: [],
      dropzoneActive: false,
    };
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true,
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false,
    });
  }

  onDrop(files) {
    // console.log('thisfiles', files);
    this.setState({
      files,
      dropzoneActive: false,
    });
    // Meteor.call('pushFileToCuckoo', files, function(err, res) {
    //   //console.log(err, 'debuggg', res, 'debuggg');
    // });
    this.showProcessModal(files);
  }
  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value,
    });
  }

  showProcessModal(file) {
    if (!Store.getState().processModal.processStatus) {
      this.props.showProcessModal(true, file, <T>hashing</T>);
    } else {
      this.props.hideProcessModal();
    }
  }


  render() {
    const { accept, files, dropzoneActive } = this.state;
    const { dropbox } = this.props;
    // console.log(dropbox, 'dropboxdropboxdropboxdropbox');
    let dropzoneRef;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff',
    };

    return (
      <div>
        <Dropzone
          disableClick
          style={{ width: '100%' }}
          className="dropZone"
          accept={accept}
          onDrop={this.onDrop.bind(this)}
          onDragEnter={this.onDragEnter.bind(this)}
          onDragLeave={this.onDragLeave.bind(this)}
          ref={(node) => { dropzoneRef = node; }}
          multiple={false}
        >
          { dropzoneActive && <div style={overlayStyle}><T>drop_file</T></div> }
          <div>
            <h4 className="text-center">
              <Icon className="material-icons" style={{ fontSize: '90px' }}>cloud_upload</Icon>
            </h4>

            <h6 className="text-center">OR</h6>
            <div className="text-center">
              <Button
                raised
                color="primary"
                onTouchTap={() => { dropzoneRef.open(); }}
              >
                <T>upload_file</T>
              </Button>
              <Typography gutterBottom className="tos-p">
                <T>accept_tos</T><Link to="/ToS/" className="tos-a"><T>accept_tos_1</T></Link><T>and</T><Link to="/ToS/" className="tos-a"><T>accept_tos_2</T></Link>
              </Typography>
            </div>
          </div>
        </Dropzone>
        <DialogProcess processModal={dropbox} />
      </div>
    );
  }
}

function mapStateToProps(state) {
          // console.log('dropbox', state.processModal);
  return {
    dropbox: state.processModal,
  };
}
function mapDispatchToProps(dispatch) {
  return {
            // showLoginModal: (isShowing) => { dispatch(showLoginModal(isShowing)); },
    showProcessModal: (status, file, text) => { dispatch(showProcessModal(status, file, text)); },
    hideProcessModal: () => { dispatch(hideProcessModal()); },
  };
}
DropBox.propTypes = {
          // showLoginModal: PropTypes.func.isRequired,
  showProcessModal: PropTypes.func.isRequired,
  hideProcessModal: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(DropBox);
