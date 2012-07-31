#!/usr/bin/env node

var Queue = require('gear').Queue,
    Registry = require('gear').Registry,
    registry = new Registry({module: 'gear-lib'});

console.log('hi');

/*
registry.load({filename: 'yui.js'});

new Queue({registry: registry})
    .read('')
    .inspect();*/