import { useQuery, gql } from '@apollo/client';
import NasaPhotoData from './nasa';

const comicNumber = Math.floor(Math.random() * (2645 - 1 + 1)) + 1;
console.log(comicNumber);

const GET_XKCD_COMIC = gql`
  query xkcd($comicNumber: Int!) {
    Comic(comic_number: $comicNumber) {
      month
      day
      year
      alt
    }
  }
`;
var month, day, year, earthDate;
function XkcdData() {
  const { loading, error, data } = useQuery(GET_XKCD_COMIC, {
    variables: {comicNumber}
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;
  month = data.Comic.month; day = data.Comic.day; year = data.Comic.year;
  console.log(month,day,year);
  earthDate = year + '-' + month + '-' + day;
  console.log(earthDate); 
  return (
    <div>
      <NasaPhotoData props={earthDate} text={data.Comic.alt}/>
    </div>
  );
}

export default XkcdData;