import React, { useState } from 'react';
import Gravity from './Components/Gravity';
import Magnetism from './Components/Magnetism';

function App() {
  const [selectedPage, setSelectedPage] = useState('home');

  const handlePageChange = (event: { target: { value: React.SetStateAction<string>} })  => {
    setSelectedPage(event.target.value);
  };

  const renderPage = () => {
    switch (selectedPage) {
      case 'Magnetism':
        return <Magnetism />;
      case 'Gravity':
        return <Gravity />;
        default:
          return <Magnetism />;
    }
  };

  return (
    <div className="App">
      <label htmlFor="page-select">Select a page:</label>
      <select id="page-select" value={selectedPage} onChange={handlePageChange}>
        <option value="Magnetism">Magnetism</option>
        <option value="Gravity">Gravitational Law</option>
      </select>
      {renderPage()}
    </div>
  );
}

export default App;