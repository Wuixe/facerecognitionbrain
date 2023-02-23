import { useState } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
// import Particles from 'react-particles-js';
import './App.css';

// const particlesOptions = {
//   polygon: {
//       enable: true,
//       type: 'inside',
//       move: {
//           radius: 10
//       },
//       url: 'path/to/svg.svg'
//   }
// }

function App() {
  return (
    <div className="App">
      {/* <Particles 
                params={particlesOptions} /> */}
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  )
}

export default App
