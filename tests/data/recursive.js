/**
  Juju Recursive API facade version 47.
  This file has been generated by the generate command in js-libjuju.
*/

'use strict';


class RecursiveV47 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 47;
  }

  /**
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
  */
  fullStatus(callback) {
    const params = {};
    // Prepare the request to the Juju API.
    const req = {
      type: 'Recursive',
      request: 'FullStatus',
      version: 47,
      params: params
    };
    // Send the request to the server.
    this._transport.write(req, (err, resp) => {
      if (!callback) {
        return;
      }
      if (err) {
        callback(err, {});
        return;
      }
      callback(null, {});
    });
  }
}


const wrappers = require('../wrappers.js');
if (wrappers.wrapRecursive) {
  RecursiveV47 = wrappers.wrapRecursive(RecursiveV47);
}

module.exports = RecursiveV47;
