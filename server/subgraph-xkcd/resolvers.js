const resolvers = {
  Query: {
    // returns xkcd comic info based on comic number
    Comic: (_, {comic_number}, {dataSources}) => {
      return dataSources.xkcdAPI.getXkcd(comic_number);
    },
    totally: (_, __, {dataSources}) => {
      return dataSources.totallySource.getTotally();
    },
  },
  totally: {
    __resolveReference: ({id}, {dataSources}) => {
      return dataSources.totallySource.getTotally(id);
    }
  }

};

module.exports = resolvers;