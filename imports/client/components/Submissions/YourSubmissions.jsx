import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';

const prettyBytes = require('pretty-bytes');

const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    textAlign: 'center',
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
}));

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
class YourSubmissions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!Meteor.userId()) {
      return (

        <Redirect to="/Login" />
      );
    }
    const classes = this.props.classes;
    if (!this.props.loading) {
      return (
        <Grid fluid>
          <Row
            style={{
              padding: '1em',
              flex: 1,
            }}
          >
            <Paper className={classes.paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task ID</TableCell>
                    <TableCell>File Name</TableCell>
                    <TableCell>File Size</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.tasks.map((n) => {
                    return (
                      <TableRow key={n._id.toString()}>
                        <TableCell>
                          {n.task_id}
                        </TableCell>
                        <TableCell>
                          {n.file.name}
                        </TableCell>
                        <TableCell>
                          {prettyBytes(n.file.size)}
                        </TableCell>
                        <TableCell>
                          {n.status}
                        </TableCell>
                        <TableCell>
                          {n.status}
                        </TableCell>
                        <TableCell>
                          <Link to={`/Detail/${n.task_id}`}>
                            <Button raised dense>
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Row>
          <div style={{ padding: 10 }} />
          <Row />
        </Grid>
      );
    }
    return (
      <Grid fluid>
        <Row
          style={{
            padding: '1em',
            flex: 1,
          }}
        >
          <Paper className={classes.paper}>
            <CircularProgress className={classes.progress} size={50} />
          </Paper>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(styleSheet)(YourSubmissions);
