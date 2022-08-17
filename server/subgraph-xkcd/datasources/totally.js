let { totally } = require("./totally.json");

class TotallySource {
  getTotally() {
    return totally;
  }
}

module.exports = TotallySource;
