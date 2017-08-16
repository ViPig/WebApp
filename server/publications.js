import { Meteor } from 'meteor/meteor';

import { Tasks, Analysis, Networks, ServerInfo } from '../lib/Collections';

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

Meteor.publish('server_info.public', function() {
  return ServerInfo.find({}, { sort: { date: -1 } }, { limit: 1 });
});

Meteor.publish('tasks.user_id', function(user_id) {
  return Tasks.find({ user_id: user_id });
});
