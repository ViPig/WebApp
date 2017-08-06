import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Collapsible, CollapsibleItem } from 'react-materialize';

const styleSheet = createStyleSheet(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  list_result: {
    color: 'red',
  },
}));
function toTitleCase(string) {
    // \u00C0-\u00ff for a happy Latin-1
  return string.toLowerCase().replace(/_/g, ' ').replace(/\b([a-z\u00C0-\u00ff])/g, function (_, initial) {
    return initial.toUpperCase();
  }).replace(/(\s(?:de|a|o|e|da|do|em|ou|[\u00C0-\u00ff]))\b/ig, function (_, match) {
    return match.toLowerCase();
  });
}
class Behavior extends Component {
  render() {
    const behavior = this.props.behavior;
    const summary = behavior.summary;
    return (
      <div>
        <Collapsible popout>
          {Object.keys(summary).map(key =>
            <CollapsibleItem header={toTitleCase(key.replace('_', ' '))} icon="filter_drama" key={key.toString()}>
              <Table>
                <TableBody>
                  {summary[key].map((file_open, i) => {
                    if (Array.isArray(file_open)) {
                      return (
                        <div>
                          <TableRow key={i.toString()}>
                            From: {file_open[0]}
                          </TableRow>
                          <TableRow>
                            To: {file_open[1]}
                          </TableRow>
                          <hr />
                        </div>
                      );
                    }
                    return (
                      <TableRow key={i.toString()}>
                        <TableCell>
                          {file_open}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CollapsibleItem>,
          )}

        </Collapsible>

      </div>
    );
  }
}

export default withStyles(styleSheet)(Behavior);
