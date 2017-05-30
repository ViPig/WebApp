import { Meteor } from 'meteor/meteor';

getCurrentEmail = () => {
  const userId = Meteor.userId();
  const user = Meteor.users.findOne({ _id: userId });
  return user.emails[0].address;
};


export { getCurrentEmail };
