import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Line, Doughnut, Polar, Bar } from 'react-chartjs-2';
import Paper from 'material-ui/Paper';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent(i18n.createTranslator());

const styleSheet = createStyleSheet(theme => ({

}));

class ServerStatus extends Component {
  constructor(props) {
    super(props);
    this.cpu_data = [];
    this.cpu_info = {};
    this.cpu_label = [];
    this.mem_data = [];
    this.mem_info = {};
    this.mem_label = [];
    this.disk_data = [];
    this.disk_info = {};
    this.disk_label = [];
    this.nwc_data = [];
    this.nwc_info = {};
    this.nwc_label = [];
    this.packet_data = [];
    this.packet_info = {};
    this.packet_label = [];
  }

  getDataCPUChart() {
    if (!this.props.loading) {
      this.cpu_data = [];
      this.cpu_label = [];
      const self = this;
      Object.keys(this.props.info[0].cpu_percent).map(function(key) {
        self.cpu_data.push(self.props.info[0].cpu_percent[key]);
        self.cpu_label.push(key);
      });
      this.cpu_info = {
        labels: this.cpu_label,
        datasets: [
          {
            label: 'CPU Load',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.cpu_data,
          },
        ],
      };
    }
  }

  getDataMemChart() {
    if (!this.props.loading) {
      this.mem_data = [];
      this.mem_label = [];
      const self = this;
      Object.keys(this.props.info[0].memory).map(function(key) {
        self.mem_data.push(self.props.info[0].memory[key]);
        self.mem_label.push(key);
      });
      this.mem_info = {
        labels: this.mem_label,
        datasets: [
          {
            label: 'Ram',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: this.mem_data,
          },
        ],
      };
    }
  }
  getDataDiskChart() {
    if (!this.props.loading) {
      this.disk_data = [];
      this.disk_label = [];
      const self = this;
      Object.keys(this.props.info[0].disk).map(function(key) {
        self.disk_data.push(self.props.info[0].disk[key]);
        self.disk_label.push(key);
      });
      this.disk_info = {
        labels: this.disk_label,
        datasets: [{
          data: this.disk_data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
        }],
      };
    }
  }
  getDataNWCChart() {
    if (!this.props.loading) {
      this.nwc_data = [];
      this.nwc_label = [];
      const self = this;
      Object.keys(this.props.info[0].network.ens32.transfer).map(function(key) {
        self.nwc_data.push(self.props.info[0].network.ens32.transfer[key]);
        self.nwc_label.push(key);
      });
      this.nwc_info = {
        datasets: [{
          data: this.nwc_data,
          backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB',
          ],
          label: 'My dataset', // for legend
        }],
        labels: this.nwc_label,
      };
    }
  }
  getDataPacketChart() {
    if (!this.props.loading) {
      this.packet_data = [];
      this.packet_label = [];
      const self = this;
      Object.keys(this.props.info[0].network.ens32.packet).map(function(key) {
        self.packet_data.push(self.props.info[0].network.ens32.packet[key]);
        self.packet_label.push(key);
      });
      this.packet_info = {
        datasets: [{
          data: this.packet_data,
          backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB',
          ],
          label: 'My dataset', // for legend
        }],
        labels: this.packet_label,
      };
    }
  }
  render() {
    this.getDataCPUChart();
    this.getDataMemChart();
    this.getDataNWCChart();
    this.getDataPacketChart();
    this.getDataDiskChart();
    return (
      <Grid fluid>
        <Row
          style={{
            padding: '1em',
            flex: 1,
          }}
        >
          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Paper elevation={4}>
                  <Line data={this.cpu_info} />
                </Paper>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Paper elevation={4}>
                  <Bar data={this.mem_info} />
                </Paper>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Paper elevation={4}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="text-center"><T>disk</T></div>
                  <Doughnut data={this.disk_info} />
                </Col>
              </Row>
            </Paper>
            <Paper elevation={4}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="text-center"><T>network</T></div>
                  <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <Polar data={this.nwc_info} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <Polar data={this.packet_info} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
        <div style={{ padding: 10 }} />
        <Row />
      </Grid>
    );
  }
}

export default withStyles(styleSheet)(ServerStatus);
