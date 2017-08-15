import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ServerStatus from './Status';
import { ServerInfo } from '../../../../lib/Collections';

export default createContainer(() => {
  const subscription = Meteor.subscribe('server_info.public');
  const loading = !subscription.ready();

  let info = {};
  if (!loading) {
    info = ServerInfo.find().fetch();
  }

  return { loading, info };
}, ServerStatus);
