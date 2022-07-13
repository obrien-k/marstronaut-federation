const resolvers = {
  Query: {
    // returns xkcd comic info based on comic number
    Comic: (_, {comic_number}, {dataSources}) => {
      return dataSources.xkcdAPI.getXkcd(comic_number);
    }
  }

};

module.exports = resolvers;