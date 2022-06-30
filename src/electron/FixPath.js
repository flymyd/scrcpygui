'use strict';
const shellPath = require('shell-path');

module.exports = () => {
	if (process.platform === 'win32') {
		return;
	}

	process.env.PATH = shellPath.sync() || [
		'./node_modules/.bin',
		'/.nodebrew/current/bin',
		'/usr/local/bin',
		process.env.PATH
	].join(':');
};
