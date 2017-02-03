#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs-promise');
const glob = require('globby');

const opt = {
	files: argv.files || argv.f,
	output: argv.output || argv.o
};

const manifest = (files) => {
	return files.map(path.parse).reduce((acc, x) => {
		acc[x.name] = path.format(x);
		return acc;
	}, {});
};

fs.ensureDir(path.parse(opt.output).dir).then(() => {
	return glob(opt.files);
}).then(files => {
	return fs.writeJson(opt.output, manifest(files));
}).catch(err => {
	console.error(err);
});
