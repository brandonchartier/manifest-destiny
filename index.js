#!/usr/bin/env node

const fs = require('fs-promise');
const glob = require('globby');
const minimist = require('minimist');
const path = require('path');

const manifest = (xs) => {
	return xs.map(path.parse).reduce((acc, x) => {
		acc[x.name] = path.format(x);
		return acc;
	}, {});
};

const build = ({ files = '', output = 'manifest.json' }) => {
	return fs.ensureDir(path.parse(output).dir).then(() => {
		return glob(files);
	}).then(xs => {
		return fs.writeJson(output, manifest(xs));
	}).catch(err => {
		throw new Error(err);
	});
};

// Only for CLI usage
if (require.main === module) {
	const argv = minimist(process.argv.slice(2));

	const opt = {
		files: argv.files || argv.f,
		output: argv.output || argv.o
	};

	return build(opt);
}

module.exports = build;
