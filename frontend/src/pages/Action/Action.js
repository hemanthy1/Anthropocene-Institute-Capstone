import "./Action.css";
import React, { useState } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  const handleSearch = () => {
    const lowercaseInput = searchInput.toLowerCase();
    const filteredStates = states.filter(state => state.toLowerCase().includes(lowercaseInput));
    setFilteredStates(filteredStates);
  };

  return(
    <div style={{ display: 'flex', marginTop: '20px' }}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search..."
        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px 0 0 4px', outline: 'none' }}
      />
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', borderRadius: '0 4px 4px 0', outline: 'none' }}
      >
        <option value="" disabled>Select a State</option>
        {filteredStates.map(state => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        style={{
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '0 4px 4px 0',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: '1px solid #ccc',
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;