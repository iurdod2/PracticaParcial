import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

function ComicDetail({ comic, onBack }) {
  const [imagenesPersonajes, setimagenesPersonajes] = useState([]);
  const [detallesComic, setdetallesComic] = useState(null);

  const publicKey = "53bc0898a8b72dd2e476894dc215bb4c";
  const privateKey = "7ca78c2c2e2f6fe70a8c70ec061cb2e0c12bb0b4";
  const ts = "1";
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  useEffect(() => {
    // Llamada para obtener los detalles completos del cómic
    fetch(`http://gateway.marvel.com/v1/public/comics/${comic.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then(response => response.json())
      .then(json => setdetallesComic(json.data.results[0]));

    // Llamada para obtener los personajes asociados al cómic
    fetch(`http://gateway.marvel.com/v1/public/comics/${comic.id}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then(response => response.json())
      .then(json => setimagenesPersonajes(json.data.results.map(character => character.thumbnail)));
  }, [comic.id]);

  if (!detallesComic) return <p></p>;

  return (
    <div className="comic-detail-container">
      <button onClick={onBack}>Volver</button>
      <div className="comic-detail-info">
        <h2>{detallesComic.title}</h2>
        <img src={`${detallesComic.thumbnail.path}.${detallesComic.thumbnail.extension}`} alt={detallesComic.title} />
        <p>{detallesComic.description || "Descripción no disponible."}</p>
      </div>
      <div className="character-gallery">
        <h4>Personajes en este cómic</h4>
        {imagenesPersonajes.length > 0 ? (
          imagenesPersonajes.map((thumbnail, index) => (
            <img
              key={index}
              src={`${thumbnail.path}.${thumbnail.extension}`}
              alt="Personaje de cómic"
              className="character-image"
            />
          ))
        ) : (
          <p>No hay personajes disponibles para este cómic.</p>
        )}
      </div>
    </div>
  );
}

export default ComicDetail;
