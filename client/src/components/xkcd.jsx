import { useQuery, gql } from "@apollo/client";
import NasaPhotoData from "./nasa";

const comicNumber = Math.floor(Math.random() * (2645 - 1 + 1)) + 1;
console.log(comicNumber);

const GET_XKCD_COMIC = gql`
  query xkcd($comicNumber: Int!, $testKey: String!) {
    Comic(comic_number: $comicNumber) @connection(key: $testKey){
      month
      day
      year
      alt
    }
  }
`;

function XkcdData() {
  const { loading, error, data } = useQuery(GET_XKCD_COMIC, {
    variables: { comicNumber, testKey: "somekey" },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  // destructure and use const to limit data scope leakage.
  const { month, day, year } = data.Comic;

  console.log(month, day, year);

  const earthDate = year + "-" + month + "-" + day;

  console.log(earthDate);
  return (
    <div>
      <NasaPhotoData props={earthDate} text={data.Comic.alt} />
    </div>
  );
}

export default XkcdData;
