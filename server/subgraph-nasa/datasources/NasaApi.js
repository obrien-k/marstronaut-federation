const { RESTDataSource } = require("apollo-datasource-rest");
require("dotenv").config({ path: "../.env" });

class NasaAPI extends RESTDataSource {
  willSendRequest(request) {
    request.params.set("api_key", "tDJerD6NCw1lRtlDbcCmzg3GOAui5C6XpMzLurCK");
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
    const test = await this.get(
      `mars-photos/api/v1/rovers/${encodeURIComponent(
        rover_name
      )}/photos?earth_date=${encodeURIComponent(earth_date)}`
    );
    console.log(test);
    return test;
  }

  async getApod() {
    return this.get("planetary/apod");
  }
}

module.exports = NasaAPI;
