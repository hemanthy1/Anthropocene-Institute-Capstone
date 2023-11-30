import React, {useState} from 'react';
import './Action.css'; // Import the CSS file

const Action = () => {
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

    const handleSearch = (input) => {
        const lowercaseInput = input.toLowerCase();
        const filteredStates = states.filter(state => state.toLowerCase().includes(lowercaseInput));
        setFilteredStates(filteredStates);
    };

    const handleSelect = (state) => {
        setSelectedState(state);
        setSearchInput(state);
        setFilteredStates([]);
    };

    return (
        <div>

            <h1 className="action-title">Take Action Today!</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    placeholder="Search..."
                    className="search-input"
                />
                {filteredStates.length > 0 && (
                    <ul className="dropdown">
                        {filteredStates.map((state) => (
                            <li key={state} onClick={() => handleSelect(state)}>
                                {state}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Action;