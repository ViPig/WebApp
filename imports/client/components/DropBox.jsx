import React from 'react';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/Paper';

import Files from '../../../lib/FileCollection';

const style = {
  height: 200,
  width: 300,
  textAlign: 'center',
};

export default class DropBox extends React.Component {
  constructor() {
    super();
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
    console.log('thisfiles', files);
    this.setState({
      files,
      dropzoneActive: false,
    });
    this.uploadIt(files);
  }
  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value,
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
          console.log('Starting');
        });

        uploadInstance.on('end', function (error, fileObj) {
          console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);

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
          console.log(`Error during upload: ${error}`);
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log(`Upload Percentage: ${progress}`);
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
    const { accept, files, dropzoneActive } = this.state;
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
      <Dropzone
        // disableClick
        // style={{}}
        // accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
        <p>Drop Here</p>


        <h2>Dropped files</h2>
        <ul>
          {
            this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
          }
        </ul>
      </Dropzone>
    );
  }
}
