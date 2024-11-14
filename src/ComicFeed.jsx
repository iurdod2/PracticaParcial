import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import ComicCard from './ComicCard';

function ComicFeed({ onComicSelect, cambiaFavorito }) {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0); // Estado para manejar el offset
  const limit = 20; // Cantidad de cómics por página

  const publicKey = "53bc0898a8b72dd2e476894dc215bb4c";
  const privateKey = "7ca78c2c2e2f6fe70a8c70ec061cb2e0c12bb0b4";
  const ts = "1";
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  useEffect(() => {
    // Llamada a la API con `orderBy=modified` para obtener los últimos modificados
    fetch(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=modified`)
      .then(response => response.json())
      .then(json => setComics(json.data.results));
  }, [offset]); // La llamada a la API se actualiza cada vez que cambia el offset

  // Función para ir a la página siguiente
  const handleNextPage = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  // Función para ir a la página anterior
  const handlePrevPage = () => {
    setOffset(prevOffset => (prevOffset - limit >= 0 ? prevOffset - limit : 0));
  };

  return (
    <div>
      <h2>Últimos Cómics Modificados</h2>
      <div className="comic-list">
        {comics.map(comic => (
          <ComicCard key={comic.id} comic={comic} onSelect={() => onComicSelect(comic)} cambiaFavorito={cambiaFavorito} />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={offset === 0}>Anterior</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </div>
  );
}

export default ComicFeed;
