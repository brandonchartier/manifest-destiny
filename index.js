#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs-promise');
const glob = require('globby');

const opt = {
	files: argv.files || argv.f,
	output: argv.output || argv.o
};

const parse = (files) => {
	return files.map(path.parse).reduce((acc, x) => {
		acc[x.name] = path.format(x);
		return acc;
	}, {});
};

glob(opt.files).then(files => {
	return fs.writeJson(opt.output, parse(files));
}).then(() => {
	// OK
}).catch(err => {
	console.error(err);
});
