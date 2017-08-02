import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Files = new FilesCollection({
  debug: true,
  collectionName: 'Files',
  storagePath: 'C:/Users/DuyTran/Desktop/WebApp/uploads',
  allowClientCode: false,
  onBeforeUpload(file) {
    if (file.size <= 1024 * 1024 * 100) {
      return true;
    }
    return 'Please check your file size';
  },
});

if (Meteor.isServer) {
  Files.denyClient();
  Meteor.publish('files.all', function() {
    return Files.find().cursor;
  });
} else {
  Meteor.subscribe('files.all');
}

export default Files;
