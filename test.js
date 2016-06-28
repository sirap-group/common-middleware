'use strict';

require('mocha');
var assert = require('assert');
var assemble = require('assemble-core');
var middleware = require('./');
var app;

describe('middleware', function() {
  beforeEach(function() {
    app = assemble();
    app.use(middleware({
      escapeRegex: /\.(md|tmpl|foo)$/
    }));

    app.engine(['tmpl', 'foo'], require('engine-base'));
    app.engine('md', require('engine-base'), {
      delims: ['{%', '%}']
    });

    app.create('pages');
    app.page('one.md', {
      content: 'a {%= name %} b __ESC_{DELIM__ foo %} c'
    });
    app.page('yfm.md', {
      content: '---\ntitle: YFM\n---\n{%= title %}'
    });
    app.page('two.tmpl', {
      content: 'a <%= name %> b __ESC_<DELIM__ foo %> c'
    });
    app.page('three.foo', {
      content: 'a <%= name %> b __ESC_<DELIM__ foo %> c'
    });
  });

  it('should register onLoad middleware:', function() {
    var page = app.pages.getView('one.md');
    assert.equal(page.options.handled[0], 'onLoad');
  });

  it('should parse front-matter:', function() {
    var page = app.pages.getView('yfm.md');
    assert.equal(page.data.title, 'YFM');
  });

  // test getter
  it('should create a json property on json files:', function() {
    var page = app.page('name.json', {
      content: '{"name": "Halle Schlinkert"}'
    });
    assert(page.json);
    assert.equal(typeof page.json, 'object');
    assert.equal(page.json.name, 'Halle Schlinkert');
  });

  // test setter
  it('should update json before preWrite', function() {
    var page = app.page('name.json', {
      content: '{"name": "Halle Schlinkert"}'
    });
    assert.equal(page.json.name, 'Halle Schlinkert');
    page.json.name = 'Brooke Schlinkert';
    app.handle('preWrite', page);
    assert.equal(page.content, '{\n' +
      '  "name": "Brooke Schlinkert"\n' +
    '}\n');
  });

  it('should not update json when contents is changed', function() {
    var page = app.page('name.json', {
      content: '{"name": "Halle Schlinkert"}'
    });
    assert.equal(page.json.name, 'Halle Schlinkert');
    page.json.name = 'Brooke Schlinkert';
    page.content = page.content.split('Halle Schlinkert').join('---');
    app.handle('preWrite', page);
    assert.equal(page.content, '{"name": "---"}');
  });

  it('should update json file content on preWrite:', function() {
    var page = app.page('name.json', {
      content: '{"name": "Brooke Schlinkert"}'
    });
    page.json.description = '2 yr old';
    app.handle('preWrite', page);
    assert.equal(page.content, '{\n' +
      '  "name": "Brooke Schlinkert",\n' +
      '  "description": "2 yr old"\n' +
    '}\n');
  });

  it('should allow a configName to be defined on file.json', function() {

    var page = app.page('name.json', {
      content: '{"name": "Halle Schlinkert"}'
    });
    assert(page.json);
    assert.equal(typeof page.json, 'object');
    assert.equal(page.json.name, 'Halle Schlinkert');
  });

  it('should escape curly brace delimiters:', function(cb) {
    app.pages.postRender(/./, middleware.unescape);

    var page = app.pages.getView('one.md');
    page.render({name: 'Brooke'}, function(err, res) {
      assert(!err);
      assert.equal(res.content, 'a Brooke b {%= foo %} c');
      cb();
    });
  });

  it('should escape angle bracket delimiters:', function(cb) {
    app.pages.postRender(/./, middleware.unescape);

    var page = app.pages.getView('two.tmpl');
    page.render({name: 'Brooke'}, function(err, res) {
      assert(!err);
      assert.equal(res.content, 'a Brooke b <%= foo %> c');
      cb();
    });
  });

  it('should use custom file extension regex:', function(cb) {
    app.pages.postRender(/./, middleware.unescape);

    var page = app.pages.getView('three.foo');
    page.render({name: 'Brooke'}, function(err, res) {
      assert(!err);
      assert.equal(res.content, 'a Brooke b <%= foo %> c');
      cb();
    });
  });
});

describe('json config', function() {
  beforeEach(function() {
    app = assemble();
    app.use(middleware({
      escapeRegex: /\.(md|tmpl|foo)$/,
      configName: 'fake'
    }));

    app.engine(['tmpl', 'foo', 'json'], require('engine-base'));
    app.engine('md', require('engine-base'), {
      delims: ['{%', '%}']
    });

    app.create('pages');
    app.page('one.md', {
      content: 'a {%= name %} b __ESC_{DELIM__ foo %} c'
    });
    app.page('yfm.md', {
      content: '---\ntitle: YFM\n---\n{%= title %}'
    });
    app.page('two.tmpl', {
      content: 'a <%= name %> b __ESC_<DELIM__ foo %> c'
    });
    app.page('three.foo', {
      content: 'a <%= name %> b __ESC_<DELIM__ foo %> c'
    });
  });

  it('should allow a configName to be defined on file.json', function() {
    var pkg = require('./package.json');
    pkg.fake = {};

    var page = app.page('package.json', {
      content: JSON.stringify(pkg)
    });

    assert(page.json.fake);
    assert.equal(typeof page.json.fake, 'object');
  });
});
