function ComicCard({ comic, onSelect, cambiaFavorito, esFavorito }) {
  return (
    <div className="comic-card">
      <h3 onClick={onSelect}>{comic.title}</h3> {/* Título del cómic; clic para ver detalles */}
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} onClick={onSelect} /> 
      <button onClick={() => cambiaFavorito(comic)}>
        {esFavorito ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'} {/* Botón para agregar/eliminar de favoritos */}
      </button>
    </div>
  );
}

export default ComicCard;
