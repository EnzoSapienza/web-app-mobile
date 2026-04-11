import GetArtwork from '../../services/api/getArtwork';
import GetArtworksList from '../../services/api/getArtworksList';

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <button onClick={async () => console.log(await GetArtwork(4))}>
        Traer uno
      </button>
      <button onClick={async () => console.log(await GetArtworksList(10, 1))}>
        Traer diez
      </button>
    </>
  );
}
