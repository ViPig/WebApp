import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';
import Slide from 'material-ui/transitions/Slide';
import { Redirect } from 'react-router-dom';
import Files from '../../../../lib/FileCollection';
import { hideProcessModal, uploadProcessModal } from '../../actions/showProcessingModal';
import i18n from 'meteor/universe:i18n';

const CryptoJS = require('crypto-js');
const SHA256 = require('crypto-js/sha256');

const T = i18n.createComponent(i18n.createTranslator());

arrayBufferToWordArray = (ab) => {
  const i8a = new Uint8Array(ab);
  const a = [];
  for (let i = 0; i < i8a.length; i += 4) {
    a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length);
};

class DialogProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'indeterminate',
      progress: 0,
    };
  }


  handleClose = () => {
    this.props.hideProcessModal();
  };
  hashingProcess = (files) => {
    const reader = new FileReader();
    const hash = [];
    const data = files[0];
    const self = this;
    reader.readAsArrayBuffer(files[0]);
    reader.onloadend = function () {
      hash.sha256 = SHA256(arrayBufferToWordArray(reader.result)).toString();
      Meteor.call('CheckCuckooFileExists', hash.sha256, function(err, res) {
        if (res.response && res.response.statusCode === 404) {
          self.props.uploadProcessModal(true, <T>upload_to_server</T>, false);
          self.setState({
            mode: 'determinate',
            progress: 0,
          });
          self.uploadIt(files);
        } else if (res && res.statusCode === 200) {
          self.handleClose();
          self.getExistsFile(res.data.sample.id);
        }
      });
    };
  }
  uploadingProcess = () => {
    if (this.props.processModal.uploading === true && this.props.processModal.file !== '') {
      this.uploadIt(this.props.processModal.file);
    }
  }
  getExistsFile = (id) => {
    if (id) {
      this.setState({
        task_id: id,
      });
    }
  }
  pushFile = (file) => {
    const self = this;
    Meteor.call('pushFileToCuckoo', file, function(err, res) {
      response = JSON.parse(res);
      if (response.task_id) {
        self.handleClose();
        self.setState({
          task_id: response.task_id,
        });
      }
    });
  }

  uploadIt(e) {
    const self = this;

    if (e) {
    // We upload only one file, in case
    // there was multiple files selected
      const file = e[0];

      if (file) {
        const uploadInstance = Files.insert({
          file,
          meta: {
            locator: self.props.fileLocator,
            userId: Meteor.userId(), // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true, // If you see issues with uploads, change this to false
        }, false);

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true, // Show the progress bar now
        });

      // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
        });

        uploadInstance.on('end', function (error, fileObj) {
          self.pushFile(fileObj._id + fileObj.extensionWithDot);
        });

        uploadInstance.on('uploaded', function (error, fileObj) {
        // Remove the filename from the upload box
        // self.refs.fileinput.value = '';

        // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
          });
        });

        uploadInstance.on('error', function (error, fileObj) {
        });

        uploadInstance.on('progress', function (progress, fileObj) {
        // Update our progress bar
          self.setState({
            progress,
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  render() {
    const state = this.props;
    if (state.processModal.file !== '' && state.processModal.hashing) {
      this.hashingProcess(state.processModal.file);
    }
    if (this.state.task_id) {
      return (
        <Redirect to={`/Detail/${this.state.task_id}`} />
      );
    }
    return (
      <div>
        <Dialog
          transition={Slide}
          open={state.processModal.processStatus}
        >
          <DialogTitle>
            <T>uploading</T>
          </DialogTitle>
          <DialogContent>
            <DialogContentText />
          </DialogContent>
          <br /><br />
          <div>{state.processModal.text}</div>
          <div className="text-center"><br />
            <LinearProgress mode={this.state.mode} value={this.state.progress} />
          </div>
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    showProcess: state.processModal,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    hideProcessModal: () => { dispatch(hideProcessModal()); },
    uploadProcessModal: (status, text) => { dispatch(uploadProcessModal(status, text)); },
  };
}
DialogProcess.propTypes = {
  // showLoginModal: PropTypes.func.isRequired,
  hideProcessModal: PropTypes.func.isRequired,
  uploadProcessModal: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(DialogProcess);
