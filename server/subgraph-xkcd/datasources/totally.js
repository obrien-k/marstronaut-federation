let { totally } = require("./totally.json");

class TotallySource {
  getTotally(id) {
    return { id: id, cool: this.isEven(id) };
  }

  isEven(num) {
    if (num % 2 === 0) {
      return true;
    }
    return false;
  }
}

module.exports = TotallySource;
