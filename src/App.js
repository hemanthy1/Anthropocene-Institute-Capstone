import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer';

function App() {
  return (
    <div id="site-content">
      <Navbar />
      <h1 className="hello">Hello, World!</h1>
      <Footer />
    </div>
  );
}

export default App;
