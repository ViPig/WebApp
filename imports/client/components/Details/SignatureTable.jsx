import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


export default class SignatureTable extends Component {

  render() {
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

    const marks = this.props.sign.marks;
    //console.log(marks, 'marks');
    //console.log(marks.length);
    let mark = 'none';
    if (marks.length === 0) {
      //console.log('herereeee');
      mark = 'none';
    } else {
      mark = marks[0].type;
    }


    const ListTableItems = function() {
      if (mark === 'call') {
        return (
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time &amp; API</TableCell>
                  <TableCell>Arguments</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell numeric>Return</TableCell>
                  <TableCell numeric>Repeated</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {marks.map((m, i) => {
                  const argument = m.call.arguments;
                  let arg;
                  return (
                    <TableRow key={`row${i + 222}`}>
                      <TableCell>
                        {m.call.api}
                      </TableCell>
                      <TableCell>
                        {Object.keys(argument).map(function(key) {
                          return <div key={key} >{key}: {argument[key]}</div>;
                        })}
                      </TableCell>
                      <TableCell>
                        {m.call.status}
                      </TableCell>
                      <TableCell numeric>
                        {m.call.return_value}
                      </TableCell>
                      <TableCell numeric>
                        {m.call.return_value}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* {
                mark.marks.map(item =>
                <TableRowColumn>
                {item.time}
                <br />
                {item.api}
                </TableRowColumn>,
                )
            } */}
          </div>
        );
      } else if (mark === 'ioc') {
        return (
          <div>
            <Table>
              <TableBody>
                {marks.map((m, i) => {
                  return (
                    <TableRow key={`row${i + 222}`}>
                      <TableCell>
                        {m.category}
                      </TableCell>
                      <TableCell>
                        {m.ioc}
                      </TableCell>
                      <TableCell>
                        {m.description ? m.description : ''}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* {
                mark.marks.map(item =>
                <TableRowColumn>
                {item.time}
                <br />
                {item.api}
                </TableRowColumn>,
                )
            } */}
          </div>
        );
      } else if (mark === 'generic') {
        return (
          <div>
            <Table>
              <TableBody>
                {marks.map((m, i) => {
                  return (
                    <TableRow key={`row${i + 222}`}>

                      {Object.keys(m).map(function(key) {
                        if (key === 'type') {
                          return false;
                        }
                        return <TableCell key={key} >{key}: {m[key]}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        );
      }
      return (<div />);
    };
    return (
      <div>

        <ListTableItems />
      </div>
    );
  }

}
