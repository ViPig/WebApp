import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import cytoscape from 'cytoscape';
import cydagre from 'cytoscape-dagre';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import i18n from 'meteor/universe:i18n';

import { Networks } from '../../../../lib/Collections';

cydagre(cytoscape);
const T = i18n.createComponent(i18n.createTranslator());

const styleSheet = createStyleSheet(theme => ({
  chip_tcp: {
    margin: theme.spacing.unit,
    backgroundColor: '#96d3d7',
  },
  chip_udp: {
    margin: theme.spacing.unit,
    backgroundColor: '#ff8d48',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  avatar: {
    backgroundColor: '#583a50',
  },
}));
const cyStyle = {
  height: '800px',
  display: 'block',
};

const conf = {
  boxSelectionEnabled: false,
  autounselectify: true,
  zoomingEnabled: true,
  style: [
    {
      selector: 'node',
      style: {
        content: 'data(id)',
        shape: 'data(NodeShape)',
        'text-opacity': 0.5,
        'text-valign': 'bottom',
        'text-halign': 'center',

      },
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'line-color': '#ddd',
        'target-arrow-color': '#ddd',
      },
    },
  ],
  layout: {
    name: 'grid',
  },
};

class Network extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cy: {},
      screen: 'tcp',
      title: <T>TCP Connection</T>,
    };
    this.tcp_nodes = [];
    this.udp_nodes = [];
    this.tcp_line = [];
    this.udp_line = [];
    this.getDataNetwork();
  }

  componentDidMount() {
    conf.container = this.cyRef;
    conf.elements = {
      nodes: this.tcp_nodes,
      edges: this.tcp_line,
    };

    const cy = cytoscape(conf);
    this.state = { cy };
  }
  componentWillUpdate() {
    if (this.state.cy) {
      this.state.cy.destroy();
    }
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillUnmount() {
    if (this.state.cy) {
      this.state.cy.destroy();
    }
  }
  componentDidUpdate() {
    conf.container = this.cyRef;
    if (this.state.screen === 'tcp') {
      conf.elements = {
        nodes: this.tcp_nodes,
        edges: this.tcp_line,
      };
    } else if (this.state.screen === 'udp') {
      conf.elements = {
        nodes: this.udp_nodes,
        edges: this.udp_line,
      };
    }

    const cy = cytoscape(conf);

    this.state = { cy };
  }

  getDataNetwork() {
    const tcp = this.props.network.tcp;
    const udp = this.props.network.udp;
    const tcp_edges = this.props.network.tcp_edges;
    const udp_edges = this.props.network.udp_edges;
    tcp.map((key) => {
      const data = key.match(/\w+.+:/g);
      if (data[0].toString() === NETWORK_LOCAL_IP) {
        this.tcp_nodes.push({ data: { id: key, NodeShape: 'ellipse' } });
      } else {
        this.tcp_nodes.push({ data: { id: key, NodeShape: 'pentagon' } });
      }
    });
    tcp_edges.map((key, index) => {
      this.tcp_line.push({ data: { id: index.toString(), weight: 3, source: key.src, target: key.dst } });
    });

    udp.map((key) => {
      const data = key.match(/\w+.+:/g);
      if (data[0].toString() === NETWORK_LOCAL_IP) {
        this.udp_nodes.push({ data: { id: key, NodeShape: 'ellipse' } });
      } else {
        this.udp_nodes.push({ data: { id: key, NodeShape: 'pentagon' } });
      }
    });
    udp_edges.map((key, index) => {
      this.udp_line.push({ data: { id: index.toString(), weight: 3, source: key.src, target: key.dst } });
    });
  }
  handleClick(screen, title) {
    this.setState({ screen: screen, title: title });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.row}>
          <Chip
            avatar={<Avatar className={classes.avatar}>TCP</Avatar>}
            label="Network TCP"
            onClick={() => this.handleClick('tcp', 'TCP Connection')}
            className={classes.chip_tcp}
          />
          <Chip
            avatar={<Avatar className={classes.avatar}>UDP</Avatar>}
            label="Network UDP"
            onClick={() => this.handleClick('udp', 'UDP Connection')}
            className={classes.chip_udp}
          />
        </div>
        <div>
          <Typography type="title" gutterBottom>
            {this.state.title}
          </Typography>
        </div>
        <div
          style={cyStyle} ref={(cyRef) => {
            this.cyRef = cyRef;
		  }}
        />

      </div>
    );
  }
}

export default withStyles(styleSheet)(Network);
