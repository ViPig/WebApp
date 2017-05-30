import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import DrawerUndocked from './LeftDrawer';

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('users');
  const loading = !Meteor.user();
  documents = {};
  if (loading) {
    documents = {};
  } else {
    documents = Meteor.user();
  }
  return { loading, documents };
}, DrawerUndocked);
