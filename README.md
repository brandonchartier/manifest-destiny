# Manifest Destiny

Destined to expand across your project.

## Install
`npm install --save-dev manifest-destiny`

## CLI Usage

- `manifest [options]` - Run manifest using your options
- `-f --files` - Set the files to be manifested
- `-o --output` - Set the output path

## API Usage

Manifest Destiny returns a Promise.

```js
const manifest = require('manifest-destiny');

manifest({
	files: '*.js',
	output: 'manifest.json'
}).then(() => {
	// OK
});
```

## Example
`manifest --files="src/**/*.js" --output="out/manifest.json"`
