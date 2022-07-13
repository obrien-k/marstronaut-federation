const { RESTDataSource } = require('apollo-datasource-rest');

class XkcdAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = 'https://xkcd.com/';
  }

  async getXkcd(comic_number) {
    return this.get(`/${encodeURIComponent(comic_number)}/info.0.json`);
  }

}

module.exports = XkcdAPI;