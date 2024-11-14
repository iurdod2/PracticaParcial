import { useState } from 'react';
import ComicFeed from './ComicFeed';
import ComicDetail from './ComicDetail';
import ComicFavorito from './ComicFavorito';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('feed'); // Vista actual: "feed", "detalles" o "favoritos"
  const [selectedComic, setSelectedComic] = useState(null); // Cómic seleccionado para ver detalles
  const [favoritos, setFavoritos] = useState(JSON.parse(localStorage.getItem('favoritos')) || []); // Lista de favoritos persistida en localStorage

  const vistaDetallesComic = (comic) => {
    setSelectedComic(comic);
    setCurrentView('detalles');
  };

  const cambiaFavorito = (comic) => {
    const updatedFavoritos = favoritos.some(fav => fav.id === comic.id)
      ? favoritos.filter(fav => fav.id !== comic.id) // Elimina si ya está en favoritos
      : [...favoritos, comic]; // Añade a favoritos si no está
    setFavoritos(updatedFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavoritos)); // Guarda en localStorage
  };

  const renderCurrentView = () => {
    if (currentView === 'feed') {
      return <ComicFeed onComicSelect={vistaDetallesComic} cambiaFavorito={cambiaFavorito} />;
    }
    if (currentView === 'favoritos') {
      return <ComicFavorito favoritos={favoritos} onComicSelect={vistaDetallesComic} cambiaFavorito={cambiaFavorito} />;
    }
    if (currentView === 'detalles' && selectedComic) {
      return <ComicDetail comic={selectedComic} onBack={() => setCurrentView('feed')} />;
    }
  };

  return (
    <div className="App">
      <h1>Pedro Comics</h1>
      <button onClick={() => setCurrentView('feed')}>Inicio</button> {/* Botón para vista de inicio */}
      <button onClick={() => setCurrentView('favoritos')}>Favoritos</button> {/* Botón para vista de favoritos */}
      {renderCurrentView()} {/* Renderiza la vista actual */}
    </div>
  );
}

export default App;
