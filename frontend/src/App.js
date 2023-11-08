import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Tools from "./pages/Tools/Tools";
import Faq from "./pages/Faq/Faq";
import Data from "./pages/Data/Data";
import Articles from "./pages/Articles/Articles";
import NoPage from "./pages/NoPage/NoPage";
import DirectAirCapture from './pages/DirectAirCapture/DirectAirCapture';
import KelpFarms from './pages/KelpFarms/KelpFarms';
import Reforestation from './pages/Reforestation/Reforestation';
import MoreInfo from "./pages/MoreInfo/MoreInfo";


function App() {
  return (
    <div id="site-content">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="tools" element={<Tools />} />
            <Route path="faq" element={<Faq />} />
            <Route path="data" element={<Data />} />
            <Route path="articles" element={<Articles />} />
            <Route path="dac" element={<DirectAirCapture />} />
            <Route path="kelpfarms" element={<KelpFarms />} />
            <Route path="reforestation" element={<Reforestation />} />
            <Route path="moreinfo" element={<MoreInfo />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
