#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs-promise');
const glob = require('globby');

const opt = {
	files: argv.files || argv.f,
	output: argv.output || argv.o
};

glob(opt.files).then(files => {
	const map = files.map(file => {
		const parsed = path.parse(file);

		return {
			name: parsed.name,
			path: file
		};
	});

	return fs.writeJson(opt.output, map.reduce((acc, x) => {
		acc[x.name] = x.path;
		return acc;
	}, {}));
}).then(() => {
	// OK
}).catch(err => {
	console.error(err);
});
