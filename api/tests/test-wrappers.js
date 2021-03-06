// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

'use strict';


const tap = require('tap');

const helpers = require('./test-helpers.js');
const wrappers = require('./wrappers.js');


tap.test('wrapAllModelWatcher', t => {
  class AllModelWatcherV1 extends helpers.BaseFacade{};
  const options = {facades: [wrappers.wrapAllModelWatcher(AllModelWatcherV1)]};

  t.test('next success', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allModelWatcher = conn.facades.allModelWatcher;
      const watcherId = 42;
      allModelWatcher.next(watcherId, (err, result) => {
        helpers.requestEqual(t, ws.lastRequest, {
          type: 'AllModelWatcher',
          request: 'Next',
          version: 1
        });
        t.equal(ws.lastRequest.id, watcherId);
        t.equal(err, null);
        t.deepEqual(result, {
          deltas: [[
            'model', 'change', {name: 'default'}
          ], [
            'machine', 'change', {name: 'machine2'}
          ]]
        });
        t.end();
      });
      // Reply to the next request.
      ws.reply({response: {
        deltas: [[
          'model', 'change', {name: 'default'}
        ], [
          'machine', 'change', {name: 'machine2'}
        ]]
      }});
    });
  });

  t.test('next failure', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allModelWatcher = conn.facades.allModelWatcher;
      const watcherId = 42;
      allModelWatcher.next(watcherId, (err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
      // Reply to the next request.
      ws.reply({error: 'bad wolf'});
    });
  });

  t.test('stop success', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allModelWatcher = conn.facades.allModelWatcher;
      const watcherId = 42;
      allModelWatcher.stop(watcherId, (err, result) => {
        helpers.requestEqual(t, ws.lastRequest, {
          type: 'AllModelWatcher',
          request: 'Stop',
          version: 1
        });
        t.equal(ws.lastRequest.id, watcherId);
        t.equal(err, null);
        t.deepEqual(result, {});
        t.end();
      });
      // Reply to the next request.
      ws.reply({response: {}});
    });
  });

  t.test('stop failure', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allModelWatcher = conn.facades.allModelWatcher;
      const watcherId = 42;
      allModelWatcher.stop(watcherId, (err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
      // Reply to the next request.
      ws.reply({error: 'bad wolf'});
    });
  });

  t.end();
});


tap.test('wrapAllWatcher', t => {
  class AllWatcherV0 extends helpers.BaseFacade{};
  const options = {facades: [wrappers.wrapAllWatcher(AllWatcherV0)]};

  t.test('next success', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allWatcher = conn.facades.allWatcher;
      const watcherId = 42;
      allWatcher.next(watcherId, (err, result) => {
        helpers.requestEqual(t, ws.lastRequest, {
          type: 'AllWatcher',
          request: 'Next',
          version: 0
        });
        t.equal(ws.lastRequest.id, watcherId);
        t.equal(err, null);
        t.deepEqual(result, {
          deltas: [[
            'app', 'remove', {name: 'app1'}
          ], [
            'machine', 'change', {name: 'machine2'}
          ]]
        });
        t.end();
      });
      // Reply to the next request.
      ws.reply({response: {
        deltas: [[
          'app', 'remove', {name: 'app1'}
        ], [
          'machine', 'change', {name: 'machine2'}
        ]]
      }});
    });
  });

  t.test('next failure', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allWatcher = conn.facades.allWatcher;
      const watcherId = 42;
      allWatcher.next(watcherId, (err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
      // Reply to the next request.
      ws.reply({error: 'bad wolf'});
    });
  });

  t.test('stop success', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allWatcher = conn.facades.allWatcher;
      const watcherId = 42;
      allWatcher.stop(watcherId, (err, result) => {
        helpers.requestEqual(t, ws.lastRequest, {
          type: 'AllWatcher',
          request: 'Stop',
          version: 0
        });
        t.equal(ws.lastRequest.id, watcherId);
        t.equal(err, null);
        t.deepEqual(result, {});
        t.end();
      });
      // Reply to the next request.
      ws.reply({response: {}});
    });
  });

  t.test('stop failure', t => {
    helpers.makeConnection(t, options, (conn, ws) => {
      const allWatcher = conn.facades.allWatcher;
      const watcherId = 42;
      allWatcher.stop(watcherId, (err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
      // Reply to the next request.
      ws.reply({error: 'bad wolf'});
    });
  });

  t.end();
});


tap.test('wrapApplication', t => {

  t.test('addCharmAndDeploy success', t => {
    let addCharmCalled = false;
    class ClientV2 extends helpers.BaseFacade{
      addCharm(args, callback) {
        addCharmCalled = true;
        t.deepEqual(args, {url: 'cs:haproxy-42', channel: 'candidate'});
        callback(null, {});
      }
    };
    let deployCalled = false;
    class ApplicationV7 extends helpers.BaseFacade{
      deploy(args, callback) {
        deployCalled = true;
        t.deepEqual(args, {
          applications: [{
            application: 'ha',
            charmUrl: 'cs:haproxy-42',
            channel: 'candidate',
            series: 'xenial'
          }
        ]});
        callback(null, {results: [{}]});
      }
    };
    const options = {facades: [
      ClientV2, wrappers.wrapApplication(ApplicationV7)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const application = conn.facades.application;
      application.addCharmAndDeploy({
        application: 'ha',
        charmUrl: 'cs:haproxy-42',
        channel: 'candidate',
        series: 'xenial'
      }, (err, result) => {
        t.equal(addCharmCalled, true);
        t.equal(deployCalled, true);
        t.equal(err, null);
        t.deepEqual(result, {});
        t.end();
      });
    });
  });

  t.test('addCharmAndDeploy failure client not found', t => {
    class ApplicationV7 extends helpers.BaseFacade{};
    const options = {facades: [wrappers.wrapApplication(ApplicationV7)]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const application = conn.facades.application;
      application.addCharmAndDeploy({
        application: 'haproxy',
        charmUrl: 'cs:haproxy-42',
        channel: 'candidate',
        series: 'xenial'
      }, (err, result) => {
        t.equal(
          err, 'addCharmAndDeploy requires the client facade to be loaded');
        t.deepEqual(result, null);
        t.end();
      });
    });
  });

  t.test('addCharmAndDeploy failure on initial addCharm request', t => {
    class ClientV2 extends helpers.BaseFacade{
      addCharm(args, callback) {
        callback('bad wolf', {});
      }
    };
    class ApplicationV7 extends helpers.BaseFacade{
      deploy(args, callback) {
        callback(null, {results: [{}]});
      }
    };
    const options = {facades: [
      ClientV2, wrappers.wrapApplication(ApplicationV7)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const application = conn.facades.application;
      application.addCharmAndDeploy({
        application: 'ha',
        charmUrl: 'cs:haproxy-42',
        series: 'xenial'
      }, (err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
    });
  });

  t.test('addCharmAndDeploy failure on deploy request', t => {
    class ClientV2 extends helpers.BaseFacade{
      addCharm(args, callback) {
        callback(null, {});
      }
    };
    class ApplicationV7 extends helpers.BaseFacade{
      deploy(args, callback) {
        callback('bad wolf', {results: [{}]});
      }
    };
    const options = {facades: [
      ClientV2, wrappers.wrapApplication(ApplicationV7)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const application = conn.facades.application;
      application.addCharmAndDeploy({
        application: 'ha',
        charmUrl: 'cs:haproxy-42',
        series: 'xenial'
      }, (err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
    });
  });

  t.end();
});


tap.test('wrapClient', t => {

  t.test('watch success', t => {
    class ClientV3 extends helpers.BaseFacade{
      watchAll(callback) {
        callback(null, {watcherId: 47});
      }
    };
    class AllWatcherV0 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapClient(ClientV3),
      wrappers.wrapAllWatcher(AllWatcherV0)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const client = conn.facades.client;
      let callCount = 0;
      client.watch((err, result) => {
        t.equal(err, null);
        callCount += 1;
        switch(callCount) {
          case 1:
            t.deepEqual(result, {
              deltas: [[
                'app', 'remove', {name: 'app1'}
              ], [
                'machine', 'change', {name: 'machine2'}
              ]]
            });
            break;
          case 2:
            t.deepEqual(result, {
              deltas: [['app', 'change', {name: 'app2'}]]
            });
            t.end();
            break;
        }
      });
      // Reply to next requests.
      ws.reply({response: {
        deltas: [[
          'app', 'remove', {name: 'app1'}
        ], [
          'machine', 'change', {name: 'machine2'}
        ]]
      }});
      ws.reply({response: {
        deltas: [['app', 'change', {name: 'app2'}]]
      }});
    });
  });

  t.test('watch failure allWatcher not found', t => {
    class ClientV3 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapClient(ClientV3),
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const client = conn.facades.client;
      client.watch((err, result) => {
        t.equal(err, 'watch requires the allWatcher facade to be loaded');
        t.deepEqual(result, {});
        // Only the login request has been made, no other requests.
        t.deepEqual(ws.requests.length, 1);
        t.end();
      });
    });
  });

  t.test('watch failure on initial watch request', t => {
    class ClientV3 extends helpers.BaseFacade{
      watchAll(callback) {
        callback('bad wolf', {});
      }
    };
    class AllWatcherV0 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapClient(ClientV3),
      wrappers.wrapAllWatcher(AllWatcherV0)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const client = conn.facades.client;
      client.watch((err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, {});
        t.end();
      });
    });
  });

  t.test('watch failure on next request', t => {
    class ClientV3 extends helpers.BaseFacade{
      watchAll(callback) {
        callback(null, {watcherId: 47});
      }
    };
    class AllWatcherV0 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapClient(ClientV3),
      wrappers.wrapAllWatcher(AllWatcherV0)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const client = conn.facades.client;
      client.watch((err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
      // Reply to the next request.
      ws.reply({error: 'bad wolf'});
    });
  });

  t.test('addMachine success', t => {
    let gotArgs = null;
    class ClientV3 extends helpers.BaseFacade{
      addMachines(args, callback) {
        gotArgs = args;
        callback(null, {machines: [{machine: 42}]});
      }
    };
    const options = {facades: [wrappers.wrapClient(ClientV3)]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const client = conn.facades.client;
      client.addMachine({
        arch: 'amd64',
        constraints: {cores: 8},
        jobs: ['job1', 'job2'],
        parentId: 2,
        series: 'bionic'
      }, (err, result) => {
        t.equal(err, null);
        t.deepEqual(result, {machine: 42});
        t.deepEqual(gotArgs, {params: [{
          arch: 'amd64',
          constraints: {cores: 8},
          jobs: ['job1', 'job2'],
          parentId: 2,
          series: 'bionic'
        }]});
        t.end();
      });
    });
  });

  t.test('addMachine success without jobs', t => {
    let gotArgs = null;
    class ClientV3 extends helpers.BaseFacade{
      addMachines(args, callback) {
        gotArgs = args;
        callback(null, {machines: [{machine: 42}]});
      }
    };
    const options = {facades: [wrappers.wrapClient(ClientV3)]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const client = conn.facades.client;
      client.addMachine({series: 'cosmic'}, (err, result) => {
        t.deepEqual(gotArgs, {params: [{
          jobs: ['JobHostUnits'],
          series: 'cosmic'
        }]});
        t.end();
      });
    });
  });

  t.test('addMachine failure', t => {
    class ClientV3 extends helpers.BaseFacade{
      addMachines(args, callback) {
        callback('bad wolf', {});
      }
    };
    const options = {facades: [wrappers.wrapClient(ClientV3)]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const client = conn.facades.client;
      client.addMachine({series: 'bionic'}, (err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
    });
  });

  t.end();
});


tap.test('wrapController', t => {

  t.test('watch success', t => {
    class ControllerV4 extends helpers.BaseFacade{
      watchAllModels(callback) {
        callback(null, {watcherId: 47});
      }
    };
    class AllModelWatcherV1 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapController(ControllerV4),
      wrappers.wrapAllModelWatcher(AllModelWatcherV1)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const controller = conn.facades.controller;
      let callCount = 0;
      controller.watch((err, result) => {
        t.equal(err, null);
        callCount += 1;
        switch(callCount) {
          case 1:
            t.deepEqual(result, {
              deltas: [[
                'model', 'change', {name: 'default'}
              ], [
                'machine', 'change', {name: 'machine2'}
              ]]
            });
            break;
          case 2:
            t.deepEqual(result, {
              deltas: [['app', 'change', {name: 'app2'}]]
            });
            t.end();
            break;
        }
      });
      // Reply to next requests.
      ws.reply({response: {
        deltas: [[
          'model', 'change', {name: 'default'}
        ], [
          'machine', 'change', {name: 'machine2'}
        ]]
      }});
      ws.reply({response: {
        deltas: [['app', 'change', {name: 'app2'}]]
      }});
    });
  });

  t.test('watch failure allWatcher not found', t => {
    class ControllerV4 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapController(ControllerV4),
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const controller = conn.facades.controller;
      controller.watch((err, result) => {
        t.equal(err, 'watch requires the allModelWatcher facade to be loaded');
        t.deepEqual(result, {});
        // Only the login request has been made, no other requests.
        t.deepEqual(ws.requests.length, 1);
        t.end();
      });
    });
  });

  t.test('watch failure on initial watch request', t => {
    class ControllerV4 extends helpers.BaseFacade{
      watchAllModels(callback) {
        callback('bad wolf', {});
      }
    };
    class AllModelWatcherV1 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapController(ControllerV4),
      wrappers.wrapAllModelWatcher(AllModelWatcherV1)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const controller = conn.facades.controller;
      controller.watch((err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, {});
        t.end();
      });
    });
  });

  t.test('watch failure on next request', t => {
    class ControllerV5 extends helpers.BaseFacade{
      watchAllModels(callback) {
        callback(null, {watcherId: 47});
      }
    };
    class AllModelWatcherV1 extends helpers.BaseFacade{};
    const options = {facades: [
      wrappers.wrapController(ControllerV5),
      wrappers.wrapAllModelWatcher(AllModelWatcherV1)
    ]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const controller = conn.facades.controller;
      controller.watch((err, result) => {
        t.equal(err, 'bad wolf');
        t.deepEqual(result, null);
        t.end();
      });
      // Reply to the next request.
      ws.reply({error: 'bad wolf'});
    });
  });

  t.end();
});


tap.test('wrapPinger', t => {

  const check = (t, facade, wantError) => {
    const options = {facades: [wrappers.wrapPinger(facade)]};
    helpers.makeConnection(t, options, (conn, ws) => {
      const pinger = conn.facades.myFacade;
      const interval = 10;
      const times = 4;
      let callCount = 0;
      let handle;
      // Set a timeout that fails the test in the case the pinger is not called
      // the expected amount of times, or not stopped.
      const timer = setTimeout(() => {
        handle.stop();
        t.fail('pinger not stopped');
        t.end();
      }, interval*times*10);
      handle = pinger.pingForever(interval, err => {
        t.equal(err, wantError);
        callCount += 1;
        if (callCount === times) {
          handle.stop();
          clearTimeout(timer);
          t.end();
        }
      });
    });
  };

  t.test('pingForever success', t => {
    class MyFacadeV7 extends helpers.BaseFacade{
      ping(callback) {
        callback(null, {});
      }
    };
    check(t, MyFacadeV7, null);
  });

  t.test('pingForever failure', t => {
    class MyFacadeV7 extends helpers.BaseFacade{
      ping(callback) {
        callback('bad wolf', {});
      }
    };
    check(t, MyFacadeV7, 'bad wolf');
  });

  t.end();
});
