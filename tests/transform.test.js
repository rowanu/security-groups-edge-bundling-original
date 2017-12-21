'use strict';
var tap = require('tap');
var Promise = require('bluebird');

var transform = require('../transform.js');
var rawData = require('./fixtures/getSecurityGroups.json');

tap.test('length test', function (assert) {
  return transform(rawData).then(function (data) {
    assert.equal(data.length, 5, 'should have 5 objects');
    assert.end();
  });
});

tap.test('ingress properties test', function (assert) {
  transform(rawData).then(function (data) {
    var first = data[0];
    // GroupId/GroupName example
    assert.equal(first.name, 'AppName-AppServer-ASG-SG', 'should have a name');
    assert.equal(first.id, 'sg-b8ce4cc0', 'should have an id');
    assert.equal(first.ingress[0].name, 'AppName-AppServer-ELB-SG', 'should have an id');
    assert.equal(first.name, 'AppName-AppServer-ASG-SG', 'should have a name');
    assert.equal(first.id, 'sg-b8ce4cc0', 'should have an id');
    assert.equal(first.ingress[0].name, 'AppName-AppServer-ELB-SG', 'should have an id');
    // Cidr example
    var last = data[data.length-1];
    assert.equal(last.name, 'AppName-WebServer-ELB-SG', 'should have a name');
    assert.equal(last.id, 'sg-64ce4c1c', 'should have an id');
    assert.equal(last.ingress[0].name, '0.0.0.0/0', 'should have a Cidr name');
    assert.equal(last.ingress[0].protocol, 'tcp', 'should have a protocol');
    assert.equal(last.ingress[0].fromPort, 80, 'should have a fromPort');
    assert.end();
  });
});

tap.test('egress properties test');
