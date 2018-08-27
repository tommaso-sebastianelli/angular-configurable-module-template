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
				if (ext == '.ts') {
					var tsName = path.join(source, item);
					var tsBuffer = system.readFileSync(tsName, { encoding: 'utf8' });

					var cssName = path.join(source, item.replace(ext, '.css'));
					if (system.existsSync(cssName)) {
						var cssBuffer = system.readFileSync(cssName, { encoding: 'utf8' });
						cssBuffer = cssBuffer.replace(/(\s+)/g, ' ');
						cssBuffer = cssBuffer.replace(/(\n|\\n)/g, '');
						cssBuffer = cssBuffer.replace(/(\} )/g, '\}\n\t\t');
						cssBuffer = '\n\t\t' + cssBuffer;

						tsBuffer = tsBuffer.replace('<-CSS->', cssBuffer);
					}

					var htmlName = path.join(source, item.replace(ext, '.html'));
					if (system.existsSync(htmlName)) {
						var htmlBuffer = system.readFileSync(htmlName, { encoding: 'utf8' });
						htmlBuffer = htmlBuffer.replace(/(\t)/g, '@');
						htmlBuffer = htmlBuffer.replace(/(\n|\\n)/g, '\n\t\t');
						htmlBuffer = htmlBuffer.replace(/(@)/g, '\t');
						htmlBuffer = '\n\t\t' + htmlBuffer;
						
						tsBuffer = tsBuffer.replace('<-HTML->', htmlBuffer);
					}

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
	path.join(base, './src'),
	path.join(base, './build')
);
