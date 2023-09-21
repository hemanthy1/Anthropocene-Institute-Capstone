import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer/Footer';
import HomeBodyIntro from './components/HomeBodyIntro';

function App() {
  return (
    <div id="site-content">
      <div className="content-wrap">
          <Navbar />
          <HomeBodyIntro />
      </div>
        <Footer />
    </div>
  );
}

export default App;
