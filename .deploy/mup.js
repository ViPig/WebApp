module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '10.20.0.123',
      username: 'root',
      // pem: './path/to/pem'
    password: 'vipig'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'ViPig',
    path: '../',
     volumes: {
      '/uploads':'/uploads'
    },
    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://vipigteam.com',
      MONGO_URL: 'mongodb://vipig:vipig%401995@10.20.0.124/cuckoo',
    },

    ssl: { 
		// crt: '../../openssl/vipigteam.crt', // this is a bundle of certificates
		// key: '../../openssl/vipigteam.key', // this is the private key of the certificate
		// port: 443 // 443 is the default value and it's the standard HTTPS port
		autogenerate: {
			email: 'duywpcom@gmail.com',
			domains: 'vipigteam.com,www.vipigteam.com' // comma seperated list of domains
		}
    },

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
       image: 'abernix/meteord:base',
      //  image: 'kadirahq/meteord',
      // imagePort: 80, // (default: 80, some images EXPOSE different ports)
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

//  mongo: {
//    port: 27017,
//    version: '3.4.1',
//    servers: {
//      one: {}
//    }
//  }
};
