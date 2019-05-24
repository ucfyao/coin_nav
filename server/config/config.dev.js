'use strict';

module.exports = appInfo => {
	return {
		logger: {
			appenders: {
        stdout: { type: 'stdout' },
        app: { type: 'dateFile', filename: 'logs/app.log' }
			},
			categories: {
				default: { appenders: ['stdout', 'app'], level: 'debug' }
			}
		},
		mongoose: {
			url: 'mongodb://127.0.0.1:27017/navData',
			options: {},
		}
	}
};

