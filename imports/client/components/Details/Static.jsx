import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { pink } from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import StackGrid from 'react-stack-grid';
import Typography from 'material-ui/Typography';


const styleSheet = createStyleSheet(theme => ({
  root: {
    color: pink[200],
    width: '20%',
    fontWeight: 600,
    fontSize: '1.5em',
    textTransform: 'capitalize',
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));


class StaticAnalysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getAutoResponsiveProps() {
    return {
      itemMargin: 10,
      containerWidth: this.state.containerWidth || document.body.clientWidth,
      itemClassName: 'item',
      gridWidth: 100,
      transitionDuration: '.5',
    };
  }
  render() {
    const status = this.props.status;
    const classes = this.props.classes;
    const static_analysis = this.props.static.static;
    const strings = this.props.static.strings;
    console.log('message', static_analysis);

    console.log('message', static_analysis.signature);
    if (!static_analysis.signature) {
      return (
        <div>Nothing</div>
      );
    }
    console.log(status);
    if (status === 'static') {
      return (
        <div>
          <Grid fluid>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div>
                  <h6>PE Compile Time</h6>
                  <pre>{static_analysis.pe_timestamp}</pre>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div>
                  <h6>PDB Path</h6>
                  <pre>{static_analysis.pdb_path}</pre>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div>
                  <h6>PE Imphash</h6>
                  <pre>{static_analysis.pe_imphash}</pre>
                </div>
              </Col>
            </Row>
            <div style={{ padding: 20 }} />
            {static_analysis.signature.length !== 0 &&
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <h6>Signing Certificate</h6>
                      </TableRow>
                    </TableHead>
                    {
                      static_analysis.signature.map((sign, i) => {
                        return (
                          <TableBody key={i.toString()}>
                            {Object.keys(sign).map(function(key) {
                              if (sign[key]) {
                                return (
                                  <TableRow key={key}>
                                    <TableCell classes={{ root: classes.root }}>
                                      {key.replace('_', ' ')}
                                    </TableCell>
                                    <TableCell>
                                      {sign[key]}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            })}
                          </TableBody>
                        );
                      })
                    }
                  </Table>
                </Col>
              </Row>
            }
            {static_analysis.pe_versioninfo.length !== 0 &&
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <h6>Version Infos</h6>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        static_analysis.pe_versioninfo.map((version, i) => {
                          if (version.value) {
                            return (
                              <TableRow key={i.toString()}>
                                <TableCell classes={{ root: classes.root }}>
                                  {version.name}
                                </TableCell>
                                <TableCell>
                                  {version.value}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })
                      }

                    </TableBody>
                  </Table>
                </Col>
              </Row>
            }
            {static_analysis.pe_sections.length !== 0 &&
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <h6>Sections</h6>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Name
                        </TableCell>
                        <TableCell>
                          Virtual Address
                        </TableCell>
                        <TableCell>
                          Virtual Size
                        </TableCell>
                        <TableCell>
                          Size of Raw Data
                        </TableCell>
                        <TableCell>
                          Entropy
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        static_analysis.pe_sections.map((section, key) => {
                          return (
                            <TableRow key={key.toString()}>
                              <TableCell>
                                {section.name}
                              </TableCell>
                              <TableCell>
                                {section.virtual_address}
                              </TableCell>
                              <TableCell>
                                {section.virtual_size}
                              </TableCell>
                              <TableCell>
                                {section.size_of_data}
                              </TableCell>
                              <TableCell>
                                {section.entropy}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      }

                    </TableBody>
                  </Table>
                </Col>
              </Row>
            }
            {static_analysis.pe_resources.length !== 0 &&
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <h6>Resources</h6>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Name
                        </TableCell>
                        <TableCell>
                          Offset
                        </TableCell>
                        <TableCell>
                          Size
                        </TableCell>
                        <TableCell>
                          Language
                        </TableCell>
                        <TableCell>
                          Sub-language
                        </TableCell>
                        <TableCell>
                          File type
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        static_analysis.pe_resources.map((resource, key) => {
                          return (
                            <TableRow key={key.toString()}>
                              <TableCell>
                                {resource.name}
                              </TableCell>
                              <TableCell>
                                {resource.offset}
                              </TableCell>
                              <TableCell>
                                {resource.size}
                              </TableCell>
                              <TableCell>
                                {resource.language}
                              </TableCell>
                              <TableCell>
                                {resource.sublanguage}
                              </TableCell>
                              <TableCell>
                                {resource.filetype}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      }

                    </TableBody>
                  </Table>
                </Col>
              </Row>
            }
            {static_analysis.pe_imports.length !== 0 &&
              <StackGrid
                columnWidth={300}
              >
                {static_analysis.pe_imports.map((imp, i) => {
                  return (
                    <div key={i.toString()}>
                      <Paper elevation={4} className={classes.paper}>
                        <Typography type="headline" component="h6">
                          {imp.dll}
                        </Typography>
                        <List>
                          {imp.imports.map((item, key) => {
                            return (
                              <ListItem dense button key={key.toString()}>
                                <ListItemText primary={`•${item.address}`} />
                                <ListItemText primary={item.name} />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Paper>
                    </div>
                  );
                })
                }
              </StackGrid>
            }
          </Grid>
        </div>
      );
    } else if (status === 'strings') {
      return (
        <Paper elevation={4} className={classes.paper}>
          {
            strings.map((string, i) => {
              return (
                <div key={i.toString()}>{string}</div>
              );
            })
          }
        </Paper>
      );
    }
    return (
      <div />
    );
  }
}
export default withStyles(styleSheet)(StaticAnalysis);
