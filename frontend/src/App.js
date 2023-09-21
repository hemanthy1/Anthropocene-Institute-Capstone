import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import HomeBodyIntro from './components/HomeBodyIntro';

function App() {
  return (
    <div id="site-content">
      <Navbar />
      <HomeBodyIntro />
      <Footer />
    </div>
  );
}

export default App;
