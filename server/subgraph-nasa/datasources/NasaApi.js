const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({path: '../.env'});

class NasaAPI extends RESTDataSource {
  willSendRequest(request) {
    request.params.set('api_key',`${process.env.NASA_KEY}`);
  }

  constructor() {
    super();
    this.baseURL = 'https://api.nasa.gov/';
  }


  async getManifest(rover_name) {
    return this.get(`mars-photos/api/v1/manifests/${encodeURIComponent(rover_name)}`);
  }

  async getApod() {
    return this.get('planetary/apod');
  }
}

module.exports = NasaAPI;