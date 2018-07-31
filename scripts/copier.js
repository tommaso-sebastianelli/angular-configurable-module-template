// Modules
const events = require('events');
const path = require('path');
const system = require('fs');

// Base
var base = process.cwd();
var emitter = new events();

// Events
emitter.on(
	'code:ok',
	function () {
		process.exit(0);
	}
);

// Functions
function codeBuild(source, target) {
	// Create
	if (!system.existsSync(target)) {
		system.mkdirSync(target);
	}

	// Copy
	var items = system.readdirSync(source);
	items.forEach(
		function (item, index) {
			var ext = path.extname(item);

			var stats =
				system.statSync(
					path.join(source, item)
				);

			if (stats.isFile()) {
				if (ext == '.js') {
					var tsName = path.join(source, item);
					var tsBuffer = system.readFileSync(tsName, { encoding: 'utf8' });

					system.writeFileSync(
						path.join(target, item),
						tsBuffer,
						{ encoding: 'utf8' }
					);
				}
			}

			if (stats.isDirectory()) {
				codeBuild(
					path.join(source, item),
					path.join(target, item)
				);
			}
		}
	);
}

// Execute
codeBuild(
	path.join(base, './build'),
	path.join(base, './output')
);
