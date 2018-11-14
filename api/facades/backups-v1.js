/**
  Juju Backups version 1.
  This API facade is available on model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Fri 2018/11/09 14:32:38 UTC. Do not manually edit this file.
*/

'use strict';

const {createAsyncHandler} = require('../transform.js');

/**
  API provides backup-specific API methods.
*/
class BackupsV1 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 1;
  }

  /**
    Create is the API method that requests juju to create a new backup of its
    state.  It returns the metadata for that backup.  NOTE(hml) this
    provides backwards compatibility for facade version 1.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          notes: string,
          keepCopy: bool,
          noDownload: bool
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          id: string,
          checksum: string,
          checksumFormat: string,
          size: int,
          stored: time,
          started: time,
          finished: time,
          notes: string,
          model: string,
          machine: string,
          hostname: string,
          version: anything,
          series: string,
          caCert: string,
          caPrivateKey: string,
          filename: string
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  create(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#BackupsCreateArgs
      if (args) {
        params = {};
        params['notes'] = args.notes;
        params['keep-copy'] = args.keepCopy;
        params['no-download'] = args.noDownload;
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Backups',
        request: 'Create',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#BackupsMetadataResult
        if (resp) {
          result = {};
          result.id = resp['id'];
          result.checksum = resp['checksum'];
          result.checksumFormat = resp['checksum-format'];
          result.size = resp['size'];
          // time#Time
          result.stored = resp['stored'];
          // time#Time
          result.started = resp['started'];
          // time#Time
          result.finished = resp['finished'];
          result.notes = resp['notes'];
          result.model = resp['model'];
          result.machine = resp['machine'];
          result.hostname = resp['hostname'];
          // github.com/juju/version#Number
          result.version = resp['version'];
          result.series = resp['series'];
          result.caCert = resp['ca-cert'];
          result.caPrivateKey = resp['ca-private-key'];
          result.filename = resp['filename'];
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    FinishRestore implements the server side of Backups.FinishRestore.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  finishRestore(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'Backups',
        request: 'FinishRestore',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    Info provides the implementation of the API method.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          id: string
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          id: string,
          checksum: string,
          checksumFormat: string,
          size: int,
          stored: time,
          started: time,
          finished: time,
          notes: string,
          model: string,
          machine: string,
          hostname: string,
          version: anything,
          series: string,
          caCert: string,
          caPrivateKey: string,
          filename: string
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  info(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#BackupsInfoArgs
      if (args) {
        params = {};
        params['id'] = args.id;
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Backups',
        request: 'Info',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#BackupsMetadataResult
        if (resp) {
          result = {};
          result.id = resp['id'];
          result.checksum = resp['checksum'];
          result.checksumFormat = resp['checksum-format'];
          result.size = resp['size'];
          // time#Time
          result.stored = resp['stored'];
          // time#Time
          result.started = resp['started'];
          // time#Time
          result.finished = resp['finished'];
          result.notes = resp['notes'];
          result.model = resp['model'];
          result.machine = resp['machine'];
          result.hostname = resp['hostname'];
          // github.com/juju/version#Number
          result.version = resp['version'];
          result.series = resp['series'];
          result.caCert = resp['ca-cert'];
          result.caPrivateKey = resp['ca-private-key'];
          result.filename = resp['filename'];
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    List provides the implementation of the API method.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        <object>
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          list: []{
            id: string,
            checksum: string,
            checksumFormat: string,
            size: int,
            stored: time,
            started: time,
            finished: time,
            notes: string,
            model: string,
            machine: string,
            hostname: string,
            version: anything,
            series: string,
            caCert: string,
            caPrivateKey: string,
            filename: string
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  list(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#BackupsListArgs
      if (args) {
        params = {};
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Backups',
        request: 'List',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#BackupsListResult
        if (resp) {
          result = {};
          result.list = [];
          resp['list'] = resp['list'] || [];
          for (let i = 0; i < resp['list'].length; i++) {
            // github.com/juju/juju/apiserver/params#BackupsMetadataResult
            if (resp['list'][i]) {
              result.list[i] = {};
              result.list[i].id = resp['list'][i]['id'];
              result.list[i].checksum = resp['list'][i]['checksum'];
              result.list[i].checksumFormat = resp['list'][i]['checksum-format'];
              result.list[i].size = resp['list'][i]['size'];
              // time#Time
              result.list[i].stored = resp['list'][i]['stored'];
              // time#Time
              result.list[i].started = resp['list'][i]['started'];
              // time#Time
              result.list[i].finished = resp['list'][i]['finished'];
              result.list[i].notes = resp['list'][i]['notes'];
              result.list[i].model = resp['list'][i]['model'];
              result.list[i].machine = resp['list'][i]['machine'];
              result.list[i].hostname = resp['list'][i]['hostname'];
              // github.com/juju/version#Number
              result.list[i].version = resp['list'][i]['version'];
              result.list[i].series = resp['list'][i]['series'];
              result.list[i].caCert = resp['list'][i]['ca-cert'];
              result.list[i].caPrivateKey = resp['list'][i]['ca-private-key'];
              result.list[i].filename = resp['list'][i]['filename'];
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    PrepareRestore implements the server side of Backups.PrepareRestore.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  prepareRestore(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'Backups',
        request: 'PrepareRestore',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    Restore implements the server side of Backups.Restore.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          backupId: string
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  restore(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#RestoreArgs
      if (args) {
        params = {};
        params['backup-id'] = args.backupId;
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Backups',
        request: 'Restore',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }
}


const wrappers = require('../wrappers.js');
if (wrappers.wrapBackups) {
  // Decorate the facade class in order to improve user experience.
  BackupsV1 = wrappers.wrapBackups(BackupsV1);
}

module.exports = BackupsV1;