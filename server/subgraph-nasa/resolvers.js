const resolvers = {
  Query: {
    // returns mission info based on the rover name
    Manifest: (_, {name}, {dataSources}) => {
      return dataSources.nasaAPI.getManifest(name);
    },
    Photolist: (_, {rover_name, earth_date}, {dataSources}) => {
      return dataSources.nasaAPI.getPhotos(rover_name, earth_date);
    },
    Apod: (_, __, {dataSources}) => {
      return dataSources.nasaAPI.getApod();
    }
  },
  Photo_Details: {
    totally: () => {
      return {id: 141592};
    }
  }

};

module.exports = resolvers;