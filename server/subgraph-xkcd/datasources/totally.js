class TotallySource {
  getTotally(id = 0) {
    return { id, cool: this.isEven(id) };
  }

  isEven(num) {
    return num % 2 === 0;
  }
}

module.exports = TotallySource;
