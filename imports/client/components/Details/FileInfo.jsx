import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { pink } from 'material-ui/colors';
import { LinearProgress, CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import SaveIcon from 'material-ui-icons/Save';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Badge from 'material-ui/Badge';


import SignatureTable from './SignatureTable';
import StaticAnalysis from './Static';
import VirusTotal from './VirusTotal';
import Behavior from './Behavior';
import Screenshots from './Screenshots';
import Video from './Video';
import Network from './Network';

const prettyBytes = require('pretty-bytes');

const cardheader = {
  // flex: 1,
  // alignItems: 'center',
  // textAlign: 'center',
};

const styleSheet = createStyleSheet('LetterAvatars', theme => ({
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    color: pink[500],
    backgroundColor: 'transparent',
    overflow: 'initial',
    fontSize: 14,

  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  dense: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  linear: {
    width: '100%',
    marginTop: 30,
  },
  progress: {
    color: green[500],
    position: 'absolute',
    top: -2,
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapper: {
    position: 'relative',
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  badge: {
    right: -20,
  },
}));

const LinearIndeterminate = props =>
  <LinearProgress color="accent" />;

const TabContainer = props =>
  <div style={{ padding: 24 }}>
    {props.children}
  </div>;
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function Signature(props) {
  const signature = props.signature.signatures;
  const loading = props.loading;
  // console.log(signature, 'signature');
  if (!loading) {
    const ListItems = signature.map(function(sign, index) {
      return (
        <CollapsibleItem header={sign.description} icon="filter_drama" key={index.toString()}>
          <SignatureTable sign={sign} />
        </CollapsibleItem>
      );
    });
    return (<div>{ ListItems }</div>);
  }
  return (
    <LinearIndeterminate />
  );
}

class FileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      status: 'static',
    };
  }
  handleChange = (event, index) => {
    this.setState({ index });
  };
  handleStaticClick = state => () => {
    this.setState(state);
  }
  render() {
    const report = this.props.report;
    const classes = this.props.classes;
    const loading = this.props.loading;
    // console.log('propsloading', this.props);
    if (!loading) {
      return (
        <div className={classes.root}>
          <AppBar position="static" className="appbar-background">
            <Tabs
              index={this.state.index}
              onChange={this.handleChange}
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Signature" />
              <Tab label="Static Analysis" />
              <Tab label="Virustotal" />
              {/* <Tab label={report.virustotal ? <Badge classes={{ badge: classes.badge }} badgeContent={report.virustotal.positives ? report.virustotal.positives : 0} color="accent" >VirusTotal</Badge> : 'VirusTotal'} /> */}
              <Tab label="Behavior" />
              <Tab label="Screenshots" />
              <Tab label="Video" />
              <Tab label="Network" />
            </Tabs>
          </AppBar>
          {this.state.index === 0 &&
            <TabContainer>
              <Collapsible popout>
                <Signature signature={report} loading={loading} />
              </Collapsible>
            </TabContainer>}
          {this.state.index === 1 &&
            <TabContainer>
              <Button raised className={classes.button} onClick={this.handleStaticClick({ status: 'static' })}>
                Static
              </Button>
              <Button raised className={classes.button} onClick={this.handleStaticClick({ status: 'strings' })}>
                Strings
              </Button>
              <StaticAnalysis status={this.state.status} static={report} />
            </TabContainer>}
          {this.state.index === 2 &&
            <TabContainer>
              <VirusTotal virustotal={report} />
            </TabContainer>}
          {this.state.index === 3 &&
            <TabContainer>
              <Behavior behavior={report.behavior} />
            </TabContainer>}
          {this.state.index === 4 &&
            <TabContainer>
              <Screenshots screenshots={report.screenshots} task_id={report.info.id} />
            </TabContainer>}
          {this.state.index === 5 &&
            <TabContainer>
              <Video task_id={report.info.id} />
            </TabContainer>}
          {this.state.index === 6 &&
            <TabContainer>
              <Network network={this.props.network} />
            </TabContainer>}
        </div>
      );
    }
    return (
      <LinearIndeterminate />
    );
  }
}

class FileInfo extends Component {

  render() {
    const classes = this.props.classes;
    const loading = this.props.loading;
    const analysis = this.props.loading_a;
    let status = '';
    let file = '';
    const score = '';
    let report = {};
    let showCircle = true;
    let network;
    if (!loading && this.props.tasks.length < 1) {
      return (
        <div><Paper elevation={4}>Cannot Found Task</Paper></div>
      );
    }
    if (this.props.report.length > 0 && this.props.network.length > 0) {
	  network = this.props.network[0];
      showCircle = false;
    }
    if (!loading) {
      status = this.props.tasks[0].status;
      file = this.props.tasks[0].file;
    }
    if (!loading && !analysis) {
      report = this.props.report[0];
    }

    return (
      <div>
        {/* xx */}
        {/* <h3>ID: {this.props.match.params.id}</h3> */}
        <div style={{ padding: 20 }} />
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Paper elevation={4}>
                <div className="box-detail">
                  <div className="inlineDiv">
                    {loading ? <LinearIndeterminate /> : <h4>{file.name}</h4>}
                    {loading ? <LinearIndeterminate /> : <h6>{prettyBytes(file.size)}</h6>}
                  </div>
                </div>
                <div className="clear-both" />
                <List>
                  <ListItem dense classes={{ dense: classes.dense }}>
                    <ListItemAvatar>
                      <Avatar classes={{ colorDefault: classes.orangeAvatar }} >MD5</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={loading ? <LinearIndeterminate /> : file.md5} />
                  </ListItem>
                  <ListItem dense classes={{ dense: classes.dense }}>
                    <ListItemAvatar>
                      <Avatar classes={{ colorDefault: classes.orangeAvatar }}>SHA1</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={loading ? <LinearIndeterminate /> : file.sha1} />
                  </ListItem>
                  <ListItem dense classes={{ dense: classes.dense }}>
                    <ListItemAvatar>
                      <Avatar classes={{ colorDefault: classes.orangeAvatar }}>SHA256</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={loading ? <LinearIndeterminate /> : file.sha256} />
                  </ListItem>
                </List>

              </Paper>
            </Col>
          </Row>
          <div style={{ padding: 10 }} />
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} >
              {showCircle ? <CircularFab classes={classes} /> : <FileDetail classes={classes} report={report} loading={analysis} network={network} /> }
            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}

class CircularFab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      success: true,
    };
  }

  render() {
    const classes = this.props.classes;
    const { loading, success } = this.state;
    let buttonClass = '';

    if (success) {
      buttonClass = classes.successButton;
    }
    return (
      <div className={classes.wrapper}>
        <Button fab color="primary" className={buttonClass} onClick={this.handleButtonClick}>
          {success ? <CheckIcon /> : <SaveIcon />}
        </Button>
        {loading && <CircularProgress size={60} className={classes.progress} />}
      </div>
    );
  }
  }
export default withStyles(styleSheet)(FileInfo);
