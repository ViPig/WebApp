import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';

const cardheader = {
  flex: 1,
  alignItems: 'center',
  textAlign: 'center',
};
const style = {
  height: 200,
  width: 300,
  textAlign: 'center',
};
export default class HomeScreen extends Component {
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
    this.setState({
      files,
      dropzoneActive: false,
    });
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value,
    });
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
      <Grid fluid>
        <Row>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Card>
              <CardHeader
                style={cardheader}
                title="Today"
                subtitle="Submitted Files"
                textStyle={{ padding: 0 }}
              />
              <CardText
                style={cardheader}
              >
                100
              </CardText>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Card>
              <CardHeader
                style={cardheader}
                title="Today"
                subtitle="Submitted Files"
                textStyle={{ padding: 0 }}
              />
              <CardText
                style={cardheader}
              >
                100
              </CardText>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Card>
              <CardHeader
                style={cardheader}
                title="Today"
                subtitle="Submitted Files"
                textStyle={{ padding: 0 }}
              />
              <CardText
                style={cardheader}
              >
                100
              </CardText>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Card>
              <CardHeader
                style={cardheader}
                title="Today"
                subtitle="Submitted Files"
                textStyle={{ padding: 0 }}
              />
              <CardText
                style={cardheader}
              >
                100
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row
          style={{
            padding: '1em',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col xs={12} sm={12} md={12} lg={12}>
            <Dropzone
              style={{}}
              accept={accept}
              onDrop={this.onDrop.bind(this)}
              onDragEnter={this.onDragEnter.bind(this)}
              onDragLeave={this.onDragLeave.bind(this)}
            >
              <Paper style={style} zDepth={5} >

                { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
                <div>
                  <h2>Dropped files</h2>
                  <ul>
                    {
                      files.map(f => <li>{f.name} - {f.size} bytes</li>)
                    }
                  </ul>

                </div>
              </Paper>
            </Dropzone>
          </Col>
        </Row>
      </Grid>

    );
  }
}
