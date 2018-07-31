// Modules
const path = require('path');
const system = require('fs');

// Base
var base = process.cwd();

// Excluded
var excluded = [
	'ionic.globals'
];

// Functions
function themeBuild(source, target) {
	// Global
	var globalBuffer = [];

	// Module
	var moduleName = path.join(source, 'module.scss');
	var moduleBuffer = system.readFileSync(moduleName, { encoding: 'utf8' }).split('\n');

	// Import
	moduleBuffer.forEach(
		function (moduleLine) {
			if (moduleLine.startsWith('@import')) {
				var importName = moduleLine.replace('@import', '').replace(/[\']/g, '').replace(';', '').trim() + '.scss';

				if (themeValid(importName)) {
					importName = path.join(source, importName);

					var importBuffer = system.readFileSync(importName, { encoding: 'utf8' })
					if (importBuffer.length > 0) {
						importBuffer = importBuffer.replace(/(\n|\\n)/g, '');

						globalBuffer = globalBuffer.concat(importBuffer);
					}
				}
				else {
					globalBuffer.push(moduleLine);
				}
			}
			else {
				globalBuffer.push(moduleLine);
			}
		}
	);

	// Write
	system.writeFileSync(
		path.join(target, 'module.scss'),
		globalBuffer.join('\n'),
		{ encoding: 'utf8' }
	);
}
function themeValid(theme) {
	// Validate
	var result = true;
	excluded.forEach(
		function (item) {
			result = (result && !theme.startsWith(item));
		}
	);

	// Return
	return result;
}

// Execute
themeBuild(
	path.join(base, './theme'),
	path.join(base, './output')
);
