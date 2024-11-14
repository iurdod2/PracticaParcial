import ComicCard from './ComicCard';

function ComicFavorito({ favoritos, onComicSelect, cambiaFavorito }) {
  return (
    <div>
      <h2>Cómics Favoritos</h2>
      <div className="comic-list">
        {favoritos.length > 0 ? (
          favoritos.map(comic => (
            <ComicCard
              key={comic.id}
              comic={comic}
              onSelect={() => onComicSelect(comic)}
              cambiaFavorito={cambiaFavorito}
              esFavorito={true} // Indicador para mostrar el botón de eliminar
            />
          ))
        ) : (
          <p>No tienes cómics en tus favoritos.</p>
        )}
      </div>
    </div>
  );
}

export default ComicFavorito;
