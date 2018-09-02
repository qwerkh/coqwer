module.exports = {
    servers: {
        one: {
            // TODO: set host address, username, and authentication method
            host: '167.99.70.150',
            username: 'root',
            // pem: './path/to/pem'
            password: 'rrqwer123#'
            // or neither for authenticate from ssh-agent
        }
    },

    app: {
        // TODO: change app name and path
        name: 'label',
        path: '../.',

        servers: {
            one: {},
        },

        buildOptions: {
            serverOnly: true,
        },

        env: {
            // TODO: Change to your app's url
            // If you are using ssl, it needs to start with https://
            PORT: 7777,
            ROOT_URL: 'http://167.99.70.150',
            MONGO_URL: 'mongodb://localhost/label',
            //MONGO_OPLOG_URL: 'mongodb://mongodb/local',
            TZ: 'Asia/Bangkok'
        },

        docker: {
            // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
            //image: 'abernix/meteord:node-8.4.0-base',
            image: 'abernix/meteord:base',
        },

        // Show progress bar while uploading bundle to server
        // You might need to disable it on CI servers
        enableUploadProgressBar: true
    },

    mongo: {
        port: 27017,
        version: '3.4.1',
        oplog: true,
        servers: {
            one: {}
        }
    },

    // (Optional)
    // Use the proxy to setup ssl or to route requests to the correct
    // app when there are several apps

    // proxy: {
    //   domains: 'mywebsite.com,www.mywebsite.com',

    //   ssl: {
    //     // Enable Let's Encrypt
    //     letsEncryptEmail: 'email@domain.com'
    //   }
    // }
};