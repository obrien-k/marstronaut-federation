import { useQuery, gql } from '@apollo/client';
import '../App.css';
import mongoose from 'mongoose';
import ImageList from '../models/imagelist'

// Set up default mongoose connection
const mongoDB = "mongodb+srv://mars:V2snkmD2s2ir0iAn@marstronaut.r0sh3sf.mongodb.net/Marstronaut";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(function(data) { console.log("data = ", data); }).catch(function(err) { console.log(err); });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const GET_PHOTO = gql`
query GetPhoto($roverName: String!, $earthDate: String!) {
  Apod {
    hdurl
  }
  Photolist(rover_name: $roverName, earth_date: $earthDate) {
    photos {
      img_src
    }
  }
}
`;
function NasaPhotoData(earthDate) {
  // More POC messiness, re-factor to use more generic name instead of earthDate
  const xkcdDate = earthDate.props;
  const { loading, error, data } = useQuery(GET_PHOTO, {
  // Would be cool to have the date determine which rover is returned
    variables: {earthDate: xkcdDate, roverName: 'curiosity'}
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  /* Iterating through the data, this should be re-factored
      to be handled in gql server (e.g. limit the data that
      is being queried/returned) */
      

  const images = (data.Photolist.photos);
  const imageList = []
  images.forEach(e =>{imageList.push(e.img_src)})
  const finalImage = imageList.slice(0,1)

  try {
    const newImageList = new ImageList({
      img_src: imageList.img_src
    });

    const n = newImageList.save();

    console.log(n);
  } catch (err) {
    console.error(err.message);
    return(err);
  }

  return (
    <div className='nasaBackgroundImage' style={{backgroundImage: data.Photolist.photos.length > 0 ? `url(${finalImage})` : `url(${data.Apod.hdurl})`,
                 backgroundSize: 'cover',
                 minWidth: '720px',
                 maxWidth: '100%',
                 minHeight: '1080px',
                 maxHeight: '100%',
                 }}>
      <div className='xkcdText' style={{ fontFace:'Lobster, Garamond, Helvetica', 
                    fontSize:'xxx-large', fontWeight:'900', 
                    textShadow: '1px 1px #fff',
                    padding:'200px'}}>
        <p>{earthDate.text}</p>
      </div>
      <div className='courtesyBackground'>
        <p className='courtesyText'>Text courtesy <a href="https://xkcd.com/json.html">xkcd</a>, images courtesy <a href="https://api.nasa.gov">NASA</a>, launched on <a href="https://apollographql.com">Apollo</a> 🚀 Source code on <a href="https://github.com/obrien-k/marstronaut-federation">GitHub</a></p>
      </div>
    </div>
  );
}

export default NasaPhotoData;
