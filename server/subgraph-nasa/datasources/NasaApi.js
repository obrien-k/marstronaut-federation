const { RESTDataSource } = require("apollo-datasource-rest");
require("dotenv").config();

class NasaAPI extends RESTDataSource {
  willSendRequest(request) {
    request.params.set("api_key", process.env.NASA_API_KEY);
  }

  constructor() {
    super();
    this.baseURL = "https://api.nasa.gov/";
  }

  async getManifest(rover_name) {
    return this.get(
      `mars-photos/api/v1/manifests/${encodeURIComponent(rover_name)}`
    );
  }

  async getPhotos(rover_name, earth_date) {
    return await this.get(
      `mars-photos/api/v1/rovers/${encodeURIComponent(
        rover_name
      )}/photos?earth_date=${encodeURIComponent(earth_date)}`
    );
  }

  async getApod() {
    return this.get("planetary/apod");
  }
}

module.exports = NasaAPI;
