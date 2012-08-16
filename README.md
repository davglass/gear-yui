# Build YUI Components with Gear.js

## Setup

To get started with the gear-yui builder add the following to the package.json in yui3-gallery:

```json
    "devDependencies": {
        "gear-yui": ">=0.0.1"
    },
```

Now link to pull in the dependency:

```bash
npm link
```

Once linked, you will be able to simply run the command in a directory with a build.json file:

```bash
gear-yui
```

This command will jslint, concat, write out the built files for debug, min, and, full (stripped Y.log's). It generates nearly compatible output of the ant builder.

A sample build.json looks like this:

```json
[{
    "name": "gallery-tag",
    "js": [
        "tag.js"
    ],
    "dest": "../../build/gallery-tag",
    "config": {
        "skinnable": false,
        "requires": [
            "node", "base", "plugin", "gallery-event-inserted"
        ]
    }    
}]
```

```
[component <, component>*]

component.name = Module name, i.e. gallery-tag
component.js = [relative_filename, <relative_filename>*]
component.dest = Path to build directory
component.config = Object that is passed through verbatim to the YUI loader config (requires, skinnable, etc).
```