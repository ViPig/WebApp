import { Meteor } from 'meteor/meteor';

const Future = Npm.require('fibers/future');

const HOST = `${CUCKOO_IP}:${CUCKOO_PORT}`;
const API_KEY = '725dbfe7bb4189642f0a14b477fe7363ee9559edd5c0731dc71c423d30c74030';
console.log('messagesv', Meteor.isServer);
//      params: { apikey: API_KEY, url: 'https://www.virustotal.com/vtapi/v2/url/scan' },
// if (Meteor.isServer) {
Meteor.methods({
  CheckCuckooFileExists: function(hash) {
    // Create our future instance.
    const future = new Future();
    const url = `${HOST}/files/view/sha256/${hash}`;
    HTTP.get(url, {}, function(error, response) {
      if (error) {
        console.log(error);
        future.return(error);
      } else {
        console.log(response);

        future.return(response);
      }
    });

    return future.wait();
  },
  pushFileToCuckoo: function(file) {
    const fs = Npm.require('fs');
    const request = Npm.require('request');
    const future = new Future();
    const uploadFile = FILE_PATH + file;
    const url = `${HOST}/tasks/create/file`;
    const req = request.post(url, function (err, resp, body) {
      if (err) {
        console.log('Error! Can not upload file');
        future.return(err);
      } else {
        console.log(`URL: ${body}`);
        future.return(body);
      }
    });
    const form = req.form();
    form.append('file', fs.createReadStream(uploadFile));

    return future.wait();
  },
});
