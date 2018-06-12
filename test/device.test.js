const chai = require('chai');
const Device = require('../lib/device');
const errors = require('@feathersjs/errors');

const expect = chai.expect;
const assert = chai.assert;

let created_logs = []

const mock_cloud_device = {
  "_id": "mock_cloud_device_id",
  "alias": "my NoIR 1",
  "modelId": "mock_cloud_device_model_id",
  "createdAt": "2018-06-12T17:29:38.650Z",
  "updatedAt": "2018-06-12T17:29:38.650Z",
  "__v": 0,
  "_include": [
    "model"
  ],
  "model": {
    "_id": "mock_cloud_device_model_id",
    "types": [
      "mock_cloud_device_model_type_id"
    ],
    "actions": [],
    "name": "NoIR Camera",
    "createdAt": "2018-06-12T17:27:22.650Z",
    "updatedAt": "2018-06-12T17:27:22.650Z",
    "__v": 0,
    "properties": {
      "infraredImage": {
        "base64": {
          "type": "string",
          "required": true
        },
        "name": {
          "type": "string"
        }
      }
    }
  }
}

const mock_feathers = {
  service: (name) => {
    return {
      create: (data) => {
        const created = {
          _id: "5af9c1a602db4e1917409bf2",
          deviceId: data.deviceId,
          log: {
            name: data.log.name,
            base64: data.log.base64
          },
          createdAt: "2018-05-14T17:04:38.065Z",
          updatedAt: "2018-05-14T17:04:38.065Z",
          __v: 0
        }
        created_logs.push(created);
        return Promise.resolve(created);
      },
      find: (params) => {
        return Promise.resolve({
          limit: 10,
          total: created_logs.length,
          data: created_logs
        });
      }
    }
  }
}

describe('Device Unit Test', () => {
  const device = new Device(mock_feathers, mock_cloud_device);

  it('should throw error if class parameters are not met', done => {
    try {
      const fail = new Device();
    } catch(err) {
      expect(err).to.not.equal(undefined);
      expect(err.code).to.equal(400);
      done();
    }
  });

  it('should create a new device object', done => {
    expect(device).to.not.equal(undefined);
    done();
  });

  it('should return the cloud device\'s id', done => {
    expect(device.getID()).to.equal(mock_cloud_device._id);
    done();
  });

  it('should throw not implemented error when getting device\'s uid', done => {
    try {
      const uid = device.getUID();
    } catch(err) {
      expect(err).to.not.equal(undefined);
      expect(err.code).to.equal(501);
      done();
    }
  });

  it('should return the cloud device\'s alias', done => {
    expect(device.getAlias()).to.equal(mock_cloud_device.alias);
    done();
  });

  it('should return the cloud device\'s types', done => {
    expect(device.getTypes()).to.equal(mock_cloud_device.model.types);
    done();
  });

  it('should return the cloud device\'s type properties', done => {
    expect(device.getProperties()).to.equal(mock_cloud_device.model.properties);
    done();
  });

  it('should add a new log to the cloud device', done => {
    device.addLog({
      name: 'test-log-name',
      base64: 'test-log-base64'
    })
    .then(created => {
      expect(created).to.not.equal(undefined);
      expect(created._id.toString()).to.equal('5af9c1a602db4e1917409bf2');
      expect(created.deviceId).to.equal('mock_cloud_device_id');
      expect(created.log.name).to.equal('test-log-name');
      expect(created.log.base64).to.equal('test-log-base64');
      done();
    })
    .catch(done);
  });

  it('should find all the logs of the device that are stored in the cloud', done => {
    device.getLogs()
    .then(logs => {
      expect(logs).to.not.equal(undefined);
      expect(logs.length).to.equal(1);
      expect(logs[0].cloudLog._id.toString()).to.equal('5af9c1a602db4e1917409bf2')
      done();
    })
    .catch(done);
  });

  it('should throw not implemented error when removing a log from the cloud device', done => {
    try {
      device.removeLog('5af9c1a602db4e1917409bf2');
    } catch(err) {
      expect(err).to.not.equal(undefined);
      expect(err.code).to.equal(501);
      done();
    };
  });
});
