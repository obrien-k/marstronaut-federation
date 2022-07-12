const resolvers = {
  Query: {
    // returns mission info based on the rover name
    Manifest: (_, {name}, {dataSources}) => {
      return dataSources.nasaAPI.getManifest(name);
    },
    Apod: (_, __, {dataSources}) => {
      return dataSources.nasaAPI.getApod();
    }
  }

};

module.exports = resolvers;