import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import YourSubmissions from './YourSubmissions';
import { Tasks } from '../../../../lib/Collections';

export default createContainer(({ match }) => {
  const subscription = Meteor.subscribe('tasks.user_id', Meteor.userId());
  console.log(subscription);
  const loading = !subscription.ready();

  let tasks = [];
  if (!loading) {
    tasks = Tasks.find().fetch();
  }

  return { loading, tasks };
}, YourSubmissions);
