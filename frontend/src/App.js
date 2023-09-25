import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';
import HomeBodyIntro from './components/HomeBodyIntro/HomeBodyIntro';
import OptimizationToolBlurb from "./components/OptimizationToolBlurb/OptimizationToolBlurb";

function App() {
  return (
    <div id="site-content">
      <div className="content-wrap">
          <Navbar />
          <HomeBodyIntro />
          <OptimizationToolBlurb />
      </div>
        <Footer />
    </div>
  );
}

export default App;
