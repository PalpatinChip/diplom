import React, { useState } from 'react';
import './App.css';
import ObjectDetection from './components/ObjectDetection';
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
        <ObjectDetection onCapture={handleCapture} />
      ) : (
        <SearchWidget tag={tag} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
