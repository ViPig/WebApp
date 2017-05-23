import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const cardheader = {
  flex: 1,
  alignItems: 'center',
  textAlign: 'center',
};

export default class HomeScreen extends Component {
  render() {
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
      </Grid>
    );
  }
}
