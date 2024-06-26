import React, { useState } from 'react';
import './App.css';
import CameraView from './components/CameraView';
import SearchWidget from './components/SearchWidget';

function App() {
  const [tag, setTag] = useState(null);

  const handleCapture = (capturedTag) => {
    setTag(capturedTag);
  };

  const handleBack = () => {
    setTag(null);
  };

  return (
    <div className="App">
      {tag === null ? (
        <CameraView onCapture={() => handleCapture('car')} />
      ) : (
        <SearchWidget tag={tag} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
