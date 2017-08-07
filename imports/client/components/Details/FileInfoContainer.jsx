import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FileInfo from './FileInfo';
import { Tasks, Analysis } from '../../../../lib/Collections';
import Files from '../../../../lib/FileCollection';

export default createContainer(({ match }) => {
  const subscription = Meteor.subscribe('tasks.public', match.params.id);
  const analysis = Meteor.subscribe('analysis.public', match.params.id);
  const loading = !subscription.ready();
  const loading_a = !analysis.ready();
  let dataReady = false;

  let tasks = {};
  let report = {};
  if (!loading) {
    tasks = Tasks.find().fetch();
  }
  if (!loading_a) {
    report = Analysis.find().fetch();
    if (report.length > 0) {
      dataReady = true;
    } else {
      dataReady = false;
    }
    console.log(report);
  }
  return { loading, tasks, loading_a, report, dataReady };
}, FileInfo);
