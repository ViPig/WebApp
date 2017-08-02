import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import DropBox from './DropBox';

const cardheader = {
  flex: 1,
  alignItems: 'center',
  textAlign: 'center',
};

class HomeScreen extends Component {
  render() {
    return (
      <Grid fluid>
        <Row
          style={{
            padding: '1em',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col className="full-width" >
            <DropBox />
          </Col>
        </Row>
      </Grid>

    );
  }
}
export default HomeScreen;
