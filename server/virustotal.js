import { Meteor } from 'meteor/meteor';
import { Networks, Analysis } from '../lib/Collections';

const Future = Npm.require('fibers/future');

const HOST = `${CUCKOO_IP}:${CUCKOO_PORT}`;
const API_KEY = '725dbfe7bb4189642f0a14b477fe7363ee9559edd5c0731dc71c423d30c74030';
//console.log('messagesv', Meteor.isServer);
//      params: { apikey: API_KEY, url: 'https://www.virustotal.com/vtapi/v2/url/scan' },
// if (Meteor.isServer) {
Meteor.methods({
  CheckCuckooFileExists: function(hash) {
    // Create our future instance.
    const future = new Future();
    const url = `${HOST}/files/view/sha256/${hash}`;
    HTTP.get(url, {}, function(error, response) {
      if (error) {
        //console.log(error);
        future.return(error);
      } else {
        //console.log(response);

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
        //console.log('Error! Can not upload file');
        future.return(err);
      } else {
        //console.log(`URL: ${body}`);
        future.return(body);
      }
    });
    const form = req.form();
    form.append('file', fs.createReadStream(uploadFile));

    return future.wait();
  },
  
  networkCollection: function(task_id) {
	const id = parseInt(task_id);
    const future = new Future();
	const host = Analysis.find({'info.id': id }).fetch();
	const network = Networks.find({ 'task_id': id }).fetch();
	if(!network.length){
		let tcp = [];
		let udp = [];
		let tcp_edges = [];
		let udp_edges = [];
		host[0].network.tcp.map(key => {
			if (tcp.indexOf(key.src +":"+ key.sport) == -1) {
				tcp.push(key.src +":"+ key.sport);
			}
			if (tcp.indexOf(key.dst +":"+ key.dport) == -1) {
				tcp.push(key.dst +":"+ key.dport);
			}
			tcp_edges.push({src: key.src +":"+ key.sport, dst: key.dst +":"+ key.dport});
		})
		
		host[0].network.udp.map(key => {
			if (udp.indexOf(key.src +":"+ key.sport) == -1) {
				udp.push(key.src +":"+ key.sport);
			}
			if (udp.indexOf(key.dst +":"+ key.dport) == -1) {
				udp.push(key.dst +":"+ key.dport);
			}
			udp_edges.push({src: key.src +":"+ key.sport, dst: key.dst +":"+ key.dport});
		})
		
		Networks.insert({ task_id: id, tcp: tcp, udp: udp , tcp_edges: tcp_edges, udp_edges: udp_edges});
	}
	return "OK";
	
  },
});
