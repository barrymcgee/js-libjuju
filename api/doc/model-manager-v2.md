<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Fri 2018/11/09 14:32:38 UTC. Do not manually edit this file.
--->
# ModelManager v2

ModelManagerAPIV2 provides a way to wrap the different calls between version
  2 and version 3 of the model manager API
This API facade is available on controller connections.

To include ModelManagerV2 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/model-manager-v2')]
});
```
Facade methods at then accessible at `conn.facades.modelManager`.

Go back to [index](index.md).

## Methods
- [createModel](#createModelargs-callback)
- [destroyModels](#destroyModelsargs-callback)
- [dumpModels](#dumpModelsargs-callback)
- [dumpModelsDB](#dumpModelsDBargs-callback)
- [listModelSummaries](#listModelSummariesargs-callback)
- [listModels](#listModelsargs-callback)
- [modelDefaults](#modelDefaultscallback)
- [modelInfo](#modelInfoargs-callback)
- [modelStatus](#modelStatusargs-callback)
- [modifyModelAccess](#modifyModelAccessargs-callback)
- [setModelDefaults](#setModelDefaultsargs-callback)
- [unsetModelDefaults](#unsetModelDefaultsargs-callback)

## createModel(args, callback)
CreateModel creates a new model using the account and model config
    specified in the args.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  name: string,
  ownerTag: string,
  config: map[string]anything,
  cloudTag: string,
  region: string,
  credential: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  name: string,
  type: string,
  uuid: string,
  controllerUuid: string,
  providerType: string,
  defaultSeries: string,
  cloudTag: string,
  cloudRegion: string,
  cloudCredentialTag: string,
  ownerTag: string,
  life: string,
  status: {
    status: string,
    info: string,
    data: map[string]anything,
    since: time
  },
  users: []{
    user: string,
    displayName: string,
    lastConnection: time,
    access: string
  },
  machines: []{
    id: string,
    hardware: {
      arch: string,
      mem: int,
      rootDisk: int,
      cores: int,
      cpuPower: int,
      tags: []string,
      availabilityZone: string
    },
    instanceId: string,
    status: string,
    hasVote: bool,
    wantsVote: bool
  },
  migration: {
    status: string,
    start: time,
    end: time
  },
  sla: {
    level: string,
    owner: string
  },
  agentVersion: anything
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## destroyModels(args, callback)
DestroyModels will try to destroy the specified models. If there is a block
    on destruction, this method will return an error.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  entities: []{
    tag: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## dumpModels(args, callback)
DumpModels will export the models into the database agnostic
    representation. The user needs to either be a controller admin, or have
    admin privileges on the model itself.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  entities: []{
    tag: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    result: map[string]anything,
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## dumpModelsDB(args, callback)
DumpModelsDB will gather all documents from all model collections for the
    specified model. The map result contains a map of collection names to
    lists of documents represented as maps.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  entities: []{
    tag: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    result: map[string]anything,
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## listModelSummaries(args, callback)
ListModelSummaries returns models that the specified user has access to in
    the current server.  Controller admins (superuser) can list models for
    any user.  Other users can only ask about their own models.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  userTag: string,
  all: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    result: {
      name: string,
      uuid: string,
      type: string,
      controllerUuid: string,
      providerType: string,
      defaultSeries: string,
      cloudTag: string,
      cloudRegion: string,
      cloudCredentialTag: string,
      ownerTag: string,
      life: string,
      status: {
        status: string,
        info: string,
        data: map[string]anything,
        since: time
      },
      userAccess: string,
      lastConnection: time,
      counts: []{
        entity: string,
        count: int
      },
      migration: {
        status: string,
        start: time,
        end: time
      },
      sla: {
        level: string,
        owner: string
      },
      agentVersion: anything
    },
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## listModels(args, callback)
ListModels returns the models that the specified user has access to in the
    current server.  Controller admins (superuser) can list models for any
    user.  Other users can only ask about their own models.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  tag: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  userModels: []{
    model: {
      name: string,
      uuid: string,
      type: string,
      ownerTag: string
    },
    lastConnection: time
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelDefaults(callback)
ModelDefaults returns the default config values used when creating a new
    model.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  config: map[string]{
    default: anything,
    controller: anything,
    regions: []{
      regionName: string,
      value: anything
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelInfo(args, callback)
ModelInfo returns information about the specified models.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  entities: []{
    tag: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    result: {
      name: string,
      type: string,
      uuid: string,
      controllerUuid: string,
      providerType: string,
      defaultSeries: string,
      cloudTag: string,
      cloudRegion: string,
      cloudCredentialTag: string,
      ownerTag: string,
      life: string,
      status: {
        status: string,
        info: string,
        data: map[string]anything,
        since: time
      },
      users: []{
        user: string,
        displayName: string,
        lastConnection: time,
        access: string
      },
      machines: []{
        id: string,
        hardware: {
          arch: string,
          mem: int,
          rootDisk: int,
          cores: int,
          cpuPower: int,
          tags: []string,
          availabilityZone: string
        },
        instanceId: string,
        status: string,
        hasVote: bool,
        wantsVote: bool
      },
      migration: {
        status: string,
        start: time,
        end: time
      },
      sla: {
        level: string,
        owner: string
      },
      agentVersion: anything
    },
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelStatus(args, callback)
ModelStatus is a legacy method call to ensure that we preserve backward
    compatibility. TODO (anastasiamac 2017-10-26) This should be made
    obsolete/removed.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  entities: []{
    tag: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  models: []{
    modelTag: string,
    life: string,
    hostedMachineCount: int,
    applicationCount: int,
    ownerTag: string,
    machines: []{
      id: string,
      hardware: {
        arch: string,
        mem: int,
        rootDisk: int,
        cores: int,
        cpuPower: int,
        tags: []string,
        availabilityZone: string
      },
      instanceId: string,
      status: string,
      hasVote: bool,
      wantsVote: bool
    },
    volumes: []{
      id: string,
      providerId: string,
      status: string,
      detachable: bool
    },
    filesystems: []{
      id: string,
      providerId: string,
      status: string,
      detachable: bool
    },
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modifyModelAccess(args, callback)
ModifyModelAccess changes the model access granted to users.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  changes: []{
    userTag: string,
    action: string,
    access: string,
    modelTag: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## setModelDefaults(args, callback)
SetModelDefaults writes new values for the specified default model
    settings.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  config: []{
    cloudTag: string,
    cloudRegion: string,
    config: map[string]anything
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## unsetModelDefaults(args, callback)
UnsetModelDefaults removes the specified default model settings.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  keys: []{
    cloudTag: string,
    cloudRegion: string,
    keys: []string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.