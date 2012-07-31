#!/usr/bin/env node

var BUILD_FILE = 'build.json',
    fs = require('fs'),
    path = require('path'),
    Queue = require('gear').Queue,
    Registry = require('gear').Registry,
    registry;

registry = new Registry({dirname: path.resolve(__dirname, '../', 'node_modules', 'gear-lib', 'lib')});

function build(comp) {
    var cwd = process.cwd(),
        dest = path.resolve(cwd, comp.dest, comp.name),
        filenames;

    filenames = comp.js.map(function(filename) {
        return path.resolve(cwd, "js", filename);
    });

    new Queue({registry: registry})
        .read(filenames)
        .jslint({callback: function(linted) {
            var messages = linted.jslint || [];
            console.error(linted.name + ' - ' + messages.length + ' lint errors:');
            messages.forEach(function(message) {
                console.error('    ' + message);
            });
        }, sloppy: true, white: true, nomen: true, predef: ['Y']})
        .concat({callback: function(blob) {
            var prefix = "YUI.add('" + comp.name + "', function(Y) {\n\n",
                postfix = "\n\n\n}, '@VERSION@' ," + JSON.stringify(comp.config) + ");";

            return prefix + blob.result + postfix;
        }})
        .write(dest + '-debug.js')
        .replace({regex: /Y.log\(.+?\);?/mg}) // Strip Y.log's
        .write(dest + '.js')
        .jsminify()
        .write(dest + '-min.js')
        .run(function(err, result) {
            if (err) {
                console.err(err);
            }
        });
}

function main() {
    fs.readFile(BUILD_FILE, function(err, data) {
        if (err) {
            console.error('Failed to find ' + BUILD_FILE + ' file');
            return;
        }

        JSON.parse(data).forEach(function(component) {
            build(component);
        });
    });
}

main();