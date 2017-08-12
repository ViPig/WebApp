import { Meteor } from 'meteor/meteor';

import { Tasks, Analysis , Networks} from '../lib/Collections';

import { Files } from '../lib/FileCollection';

Meteor.publish('tasks.public', function(task_id) {
  const taskId = parseInt(task_id);
  return Tasks.find({ task_id: taskId });
});

Meteor.publish('analysis.public', function(task_id) {
  const taskId = parseInt(task_id);
  return Analysis.find({ 'info.id': taskId });
});

Meteor.publish('networks.public', function(task_id) {
  const taskId = parseInt(task_id);
  return Networks.find({ task_id: taskId });
});
