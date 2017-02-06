#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs-promise');
const glob = require('globby');

const opt = {
	files: argv.files || argv.f,
	output: argv.output || argv.o
};

const manifest = (xs) => {
	return xs.map(path.parse).reduce((acc, x) => {
		acc[x.name] = path.format(x);
		return acc;
	}, {});
};

const build = ({ files, output }) => {
	if (!files) {
		throw new Error('Please specify files');
	}

	if (!output) {
		throw new Error('Please specify output');
	}

	return fs.ensureDir(path.parse(output).dir).then(() => {
		return glob(files);
	}).then(xs => {
		return fs.writeJson(output, manifest(xs));
	}).catch(err => {
		throw new Error(err);
	});
};

if (require.main === module) {
	build({
		files: opt.files,
		output: opt.output
	});
}

module.exports = build;
