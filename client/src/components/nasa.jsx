import { useQuery, gql } from '@apollo/client';

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
  console.log((earthDate.props) + '48');
  const xkcdDate = earthDate.props;
  const { loading, error, data } = useQuery(GET_PHOTO, {
    variables: {earthDate: xkcdDate, roverName: 'curiosity'}
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  //console.log(data.Photolist.photos.img_src.slice(0,1));
  const images = (data.Photolist.photos);
  const imageList = []
  images.forEach(e =>{    imageList.push(e.img_src)}
  )
  const finalImage = imageList.slice(0,1)
  return (
    <div style={{backgroundImage: data.Photolist.photos.length > 0 ? `url(${finalImage})` : `url(${data.Apod.hdurl})`,
                 backgroundSize: 'cover'}}>
      <div style={{ fontFace:'Lobster, Garamond, Helvetica', 
                    fontSize:'xxx-large', fontWeight:'900', 
                    textShadow: '1px 1px #fff',
                    padding:'200px'}}>
        <p>{earthDate.text}</p>
      </div>
    </div>
  );
}

export default NasaPhotoData;