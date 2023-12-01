import React, {useState} from 'react';
import './Action.css'; // Import the CSS file


const senatorsData = [
    {
        state: 'Alaska',
        senator: 'Stevens',
        email: 'Senator_Stevens@stevens.senate.gov',
        phone: '224-3004 224-1044',
    },
    {
        state: 'Alaska',
        senator: 'Murkowski',
        email: 'email@murkowski.senate.gov',
        phone: '224-6665 224-5301',
    },
    {
        state: 'Alabama',
        senator: 'Sessions',
        email: '',
        phone: '224-4124 224-3149',
    },
    {
        state: 'Alabama',
        senator: 'Shelby',
        email: 'senator@shelby.senate.gov',
        phone: '224-5744 224-3416',
    },
    {
        state: 'Arkansas',
        senator: 'Bumpers',
        email: 'senator@bumpers.senate.gov',
        phone: '224-4843 224-6435',
    },
    {
        state: 'Arkansas',
        senator: 'Hutchinson',
        email: 'senator.hutchinson@hutchinson.senate.gov',
        phone: '224-2353 224-8261',
    },
    {
        state: 'Arizona',
        senator: 'Kyl',
        email: 'info@kyl.senate.gov',
        phone: '224-4521 224-2302',
    },
    {
        state: 'Arizona',
        senator: 'McCain',
        email: 'Senator_McCain@mccain.senate.gov',
        phone: '224-2235 228-2862',
    },
    {
        state: 'California',
        senator: 'Boxer',
        email: 'senator@boxer.senate.gov',
        phone: '224-3553 956-6701',
    },
    {
        state: 'California',
        senator: 'Feinstein',
        email: 'senator@feinstein.senate.gov',
        phone: '224-3841 228-3954',
    },
    {
        state: 'Colorado',
        senator: 'Campbell',
        email: 'data@nighthorse.falcontech.com',
        phone: '224-5852 225-0228',
    },
    {
        state: 'Colorado',
        senator: 'Allard',
        email: '',
        phone: '224-5941 224-6471',
    },
    {
        state: 'Connecticut',
        senator: 'Dodd',
        email: 'sen_dodd@dodd.senate.gov',
        phone: '224-2823 224-1083',
    },
    {
        state: 'Connecticut',
        senator: 'Lieberman',
        email: 'senator_lieberman@lieberman.senate.gov',
        phone: '224-4041 224-9750',
    },
    {
        state: 'Delaware',
        senator: 'Biden',
        email: 'senator@biden.senate.gov',
        phone: '224-5042 224-0139',
    },
    {
        state: 'Delaware',
        senator: 'Roth',
        email: '',
        phone: '224-2441 224-2805',
    },
    {
        state: 'Florida',
        senator: 'Graham',
        email: 'bob_graham@graham.senate.gov',
        phone: '224-3041 224-2237',
    },
    {
        state: 'Florida',
        senator: 'Mack',
        email: 'connie@mack.senate.gov',
        phone: '224-5274 224-8022',
    },
    {
        state: 'Georgia',
        senator: 'Cleland',
        email: 'senator_max_cleland@cleland.senate.gov',
        phone: '224-3521 224-0072',
    },
    {
        state: 'Georgia',
        senator: 'Coverdell',
        email: 'senator_coverdell@coverdell.senate.gov',
        phone: '224-3643 228-3783',
    },
    {
        state: 'Hawaii',
        senator: 'Akaka',
        email: '',
        phone: '224-6361 224-2126',
    },
    {
        state: 'Hawaii',
        senator: 'Inouye',
        email: 'senator@inouye.senate.gov',
        phone: '224-3934 224-6747',
    },
    {
        state: 'Idaho',
        senator: 'Craig',
        email: 'larry_craig@craig.senate.gov',
        phone: '224-2752 224-2573',
    },
    {
        state: 'Idaho',
        senator: 'Kempthorne',
        email: 'dirk_kempthorne@kempthorne.senate.gov',
        phone: '224-6142 224-5893',
    },
    {
        state: 'Illinois',
        senator: 'Moseley-Braun',
        email: 'senator@moseley-braun.senate.gov',
        phone: '224-2854 224-2626',
    },
    {
        state: 'Illinois',
        senator: 'Durbin',
        email: '',
        phone: '224-2152 224-0868',
    },
    {
        state: 'Indiana',
        senator: 'Coats',
        email: '',
        phone: '224-5623 224-8964',
    },
    {
        state: 'Indiana',
        senator: 'Lugar',
        email: 'lugar@iquest.net',
        phone: '224-4814 224-7877',
    },
    {
        state: 'Iowa',
        senator: 'Harkin',
        email: 'tom_harkin@harkin.senate.gov',
        phone: '224-3254 224-7431',
    },
    {
        state: 'Iowa',
        senator: 'Grassley',
        email: 'chuck_grassley@grassley.senate.gov',
        phone: '224-3744 224-6020',
    },
    {
        state: 'Kansas',
        senator: 'Brownback',
        email: 'sam_brownback@brownback.senate.gov',
        phone: '224-6521 224-8952',
    },
    {
        state: 'Kansas',
        senator: 'Roberts',
        email: '',
        phone: '224-4774 224-3514',
    },
    {
        state: 'Kentucky',
        senator: 'Ford',
        email: 'wendell_ford@ford.senate.gov',
        phone: '224-4343 224-0046',
    },
    {
        state: 'Kentucky',
        senator: 'McConnell',
        email: 'senator@mcconnell.senate.gov',
        phone: '224-2541 224-2499',
    },
    {
        state: 'Louisiana',
        senator: 'Breaux',
        email: 'senator@breaux.senate.gov',
        phone: '224-4623 224-2435',
    },
    {
        state: 'Louisiana',
        senator: 'Landrieu',
        email: 'senator@landrieu.senate.gov',
        phone: '224-5824 224-2952',
    },
    {
        state: 'Maine',
        senator: 'Snowe',
        email: 'olympia@snowe.senate.gov',
        phone: '224-5344 224-6853',
    },
    {
        state: 'Maine',
        senator: 'Collins',
        email: 'senator@collins.senate.gov',
        phone: '224-2523 224-2693',
    },
    {
        state: 'Maryland',
        senator: 'Mikulski',
        email: 'senator@mikulski.senate.gov',
        phone: '224-4654 224-8858',
    },
    {
        state: 'Maryland',
        senator: 'Sarbanes',
        email: 'senator@sarbanes.senate.gov',
        phone: '224-4524 224-1651',
    },
    {
        state: 'Massachusetts',
        senator: 'Kerry',
        email: 'john_kerry@kerry.senate.gov',
        phone: '224-2742 224-8525',
    },
    {
        state: 'Massachusetts',
        senator: 'Kennedy',
        email: 'senator@kennedy.senate.gov',
        phone: '224-4543 224-2417',
    },
    {
        state: 'Michigan',
        senator: 'Levin',
        email: 'senator@levin.senate.gov',
        phone: '224-6221 224-1388',
    },
    {
        state: 'Michigan',
        senator: 'Abraham',
        email: 'michigan@abraham.senate.gov',
        phone: '224-4822 224-8834',
    },
    {
        state: 'Minnesota',
        senator: 'Wellstone',
        email: 'senator@wellstone.senate.gov',
        phone: '224-5641 224-8438',
    },
    {
        state: 'Minnesota',
        senator: 'Grams',
        email: 'mail_grams@grams.senate.gov',
        phone: '224-3244 224-9931',
    },
    {
        state: 'Mississippi',
        senator: 'Lott',
        email: 'senatorlott@lott.senate.gov',
        phone: '224-6253 224-2262',
    },
    {
        state: 'Mississippi',
        senator: 'Cochran',
        email: 'senator@cochran.senate.gov',
        phone: '224-5054 224-3576',
    },
    {
        state: 'Missouri',
        senator: 'Bond',
        email: 'kit_bond@bond.senate.gov',
        phone: '224-5721 224-8149',
    },
    {
        state: 'Missouri',
        senator: 'Ashcroft',
        email: 'john_ashcroft@ashcroft.senate.gov',
        phone: '224-6154 224-7615',
    },
    {
        state: 'Montana',
        senator: 'Baucus',
        email: 'max@baucus.senate.gov',
        phone: '224-2651',
    },
    {
        state: 'Montana',
        senator: 'Burns',
        email: 'conrad_burns@burns.senate.gov',
        phone: '224-2644 224-8594',
    },
    {
        state: 'Nebraska',
        senator: 'Faircloth',
        email: 'senator@faircloth.senate.gov',
        phone: '224-3154 224-7406',
    },
    {
        state: 'Nebraska',
        senator: 'Helms',
        email: 'jesse_helms@helms.senate.gov',
        phone: '224-6342 224-7588',
    },
    {
        state: 'Nevada',
        senator: 'Reid',
        email: 'senator_reid@reid.senate.gov',
        phone: '224-3542 224-7327',
    },
    {
        state: 'Nevada',
        senator: 'Bryan',
        email: 'senator@bryan.sen.gov',
        phone: '224-6244 224-1867',
    },
    {
        state: 'New Hampshire',
        senator: 'Gregg',
        email: 'mailbox@gregg.senate.gov',
        phone: '224-3324 224-4952',
    },
    {
        state: 'New Hampshire',
        senator: 'Smith',
        email: 'opinion@smith.senate.gov',
        phone: '224-2841 224-1353',
    },
    {
        state: 'New Jersey',
        senator: 'Torricelli',
        email: 'senator_torricelli@torricelli.senate.gov',
        phone: '224-3224 224-8567',
    },
    {
        state: 'New Jersey',
        senator: 'Lautenberg',
        email: 'frank_lautenberg@lautenberg.senate.gov',
        phone: '224-4744 224-9707',
    },
    {
        state: 'New Mexico',
        senator: 'Bingaman',
        email: 'Senator_Bingaman@bingaman.senate.gov',
        phone: '224-5521 224-2852',
    },
    {
        state: 'New Mexico',
        senator: 'Domenici',
        email: 'senator_domenici@domenici.senate.gov',
        phone: '224-6621 224-7371',
    },
    {
        state: 'New York',
        senator: 'Moynihan',
        email: 'Senator@dpm.senate.gov',
        phone: '224-4451 228-0406',
    },
    {
        state: 'New York',
        senator: 'D\'Amato',
        email: 'senator_al@damato.senate.gov',
        phone: '224-6542 224-5871',
    },
    {
        state: 'North Carolina',
        senator: 'Glenn',
        email: 'Senator_Glenn@glenn.senate.gov',
        phone: '224-3353 224-7983',
    },
    {
        state: 'North Carolina',
        senator: 'Dewine',
        email: 'senator_dewine@dewine.senate.gov',
        phone: '224-2315 224-6519',
    },
    {
        state: 'North Dakota',
        senator: 'Inhofe',
        email: '',
        phone: '224-4721 228-0380',
    },
    {
        state: 'North Dakota',
        senator: 'Nickles',
        email: 'nickles@rpc.senate.gov',
        phone: '224-5754 224-6008',
    },
    {
        state: 'Ohio',
        senator: 'Wyden',
        email: 'wyden@teleport.com',
        phone: '224-5244 228-3576',
    },
    {
        state: 'Ohio',
        senator: 'Smith',
        email: '',
        phone: '224-3753 224-0276',
    },
    {
        state: 'Oklahoma',
        senator: 'Santorum',
        email: 'senator@santorum.senate.gov',
        phone: '224-6324 228-4991',
    },
    {
        state: 'Oklahoma',
        senator: 'Specter',
        email: 'senator_specter@specter.senate.gov',
        phone: '224-4254 224-1893',
    },
    {
        state: 'Rhode Island',
        senator: 'Reed',
        email: '',
        phone: '224-4642 224-4680',
    },
    {
        state: 'Rhode Island',
        senator: 'Chafee',
        email: 'senator_chafee@chafee.senate.gov',
        phone: '224-2921',
    },
    {
        state: 'South Carolina',
        senator: 'Hollings',
        email: 'senator@hollings.senate.gov',
        phone: '224-6121 224-4293',
    },
    {
        state: 'South Carolina',
        senator: 'Thurmond',
        email: 'senator@thurmond.senate.gov',
        phone: '224-5972 224-1300',
    },
    {
        state: 'South Dakota',
        senator: 'Daschle',
        email: 'tom_daschle@daschle.senate.gov',
        phone: '224-2321 224-2047',
    },
    {
        state: 'South Dakota',
        senator: 'Johnson',
        email: 'tim_johnson@johnson.senate.gov',
        phone: '224-5842 228-0368',
    },
    {
        state: 'Tennessee',
        senator: 'Thompson',
        email: 'senator_thompson@thompson.senate.gov',
        phone: '224-4944 228-3679',
    },
    {
        state: 'Tennessee',
        senator: 'Frist',
        email: 'senator_frist@frist.senate.gov',
        phone: '224-3344 224-8062',
    },
    {
        state: 'Texas',
        senator: 'Hutchison',
        email: 'senator@hutchison.senate.gov',
        phone: '224-5922 224-0776',
    },
    {
        state: 'Texas',
        senator: 'Gramm',
        email: 'info@gramm96.org',
        phone: '224-2934 228-2856',
    },
    {
        state: 'Utah',
        senator: 'Hatch',
        email: 'senator_hatch@hatch.senate.gov',
        phone: '224-5251 224-6331',
    },
    {
        state: 'Utah',
        senator: 'Bennett',
        email: 'senator@bennett.senate.gov',
        phone: '224-5444 224-6717',
    },
    {
        state: 'Vermont',
        senator: 'Leahy',
        email: 'senator_leahy@leahy.senate.gov',
        phone: '224-4242 224-3595',
    },
    {
        state: 'Vermont',
        senator: 'Jeffords',
        email: 'vermont@jeffords.senate.gov',
        phone: '224-5141',
    },
    {
        state: 'Washington',
        senator: 'Murray',
        email: 'senator_murray@murray.senate.gov',
        phone: '224-2621 224-0238',
    },
    {
        state: 'Washington',
        senator: 'Gorton',
        email: 'Senator_Gorton@gorton.senate.gov',
        phone: '224-3441 224-9393',
    },
    {
        state: 'Wisconsin',
        senator: 'Feingold',
        email: 'senator@feingold.senate.gov',
        phone: '224-5323 224-2725',
    },
    {
        state: 'Wisconsin',
        senator: 'Kohl',
        email: 'senator_kohl@kohl.senate.gov',
        phone: '224-5653 224-9787',
    },
    {
        state: 'West Virginia',
        senator: 'Byrd',
        email: 'Senator_Byrd@Byrd.Senate.gov',
        phone: '224-3954 224-4025',
    },
    {
        state: 'West Virginia',
        senator: 'Rockefeller',
        email: 'senator@rockefeller.senate.gov',
        phone: '224-6472 224-1689',
    },
    {
        state: 'Wyoming',
        senator: 'Thomas',
        email: 'craig@thomas.senate.gov',
        phone: '224-6441 224-3230',
    },
    {
        state: 'Wyoming',
        senator: 'Enzi',
        email: 'senator@enzi.senate.gov',
        phone: '224-3424 224-1315',
    }

];

const Action = () => {
   const [searchInput, setSearchInput] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [senatorsInfo, setSenatorsInfo] = useState([]);

  const handleSearch = () => {
    const lowercaseInput = searchInput.toLowerCase();
    const foundSenators = senatorsData.filter(
      (senator) => senator.state.toLowerCase() === lowercaseInput
    );

    if (foundSenators.length > 0) {
      setSelectedState(foundSenators[0].state);
      setSenatorsInfo(foundSenators);
    } else {
      setSelectedState('');
      setSenatorsInfo([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter a State..."
        className="search-input"
      />

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="state-dropdown"
      >
        <option value="" disabled>
          Select a State
        </option>
        {senatorsData.map((senator) => (
          <option key={senator.state} value={senator.state}>
            {senator.state}
          </option>
        ))}
      </select>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {senatorsInfo.length > 0 && (
        <div className="senators-info">
          <h2>Senators for {senatorsInfo[0].state}:</h2>
          {senatorsInfo.map((senator) => (
            <div key={senator.senator} className="senator-info">
              <h3>{senator.senator}</h3>
              <p>Email: {senator.email}</p>
              <p>Phone: {senator.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Action;