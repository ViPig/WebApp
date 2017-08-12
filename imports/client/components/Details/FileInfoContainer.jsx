import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FileInfo from './FileInfo';
import { Tasks, Analysis, Networks } from '../../../../lib/Collections';
import Files from '../../../../lib/FileCollection';

export default createContainer(({ match }) => {
  const subscription = Meteor.subscribe('tasks.public', match.params.id);
  const analysis = Meteor.subscribe('analysis.public', match.params.id);
  const networks = Meteor.subscribe('networks.public',match.params.id);
  
  const loading = !subscription.ready();
  const loading_a = !analysis.ready();
  const loading_network = !networks.ready();

  let tasks = {};
  let report = {};
  let network = {};
  if (!loading) {
    tasks = Tasks.find().fetch();
  }
  if (!loading_a) {
    report = Analysis.find().fetch();
  }
  if (!loading_network) {
    network = Networks.find().fetch();
  }
	Meteor.call('networkCollection', match.params.id)
  return { loading, tasks, loading_a, report, loading_network, network };
}, FileInfo);
