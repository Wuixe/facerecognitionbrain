import { useState } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './App.css';

const particleOptions =  {
  background: {
      color: {
          value: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)',
      },
  },
  fpsLimit: 120,
  interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: "push",
          },
          onHover: {
              enable: true,
              mode: "repulse",
          },
          resize: true,
      },
      modes: {
          push: {
              quantity: 4,
          },
          repulse: {
              distance: 200,
              duration: 0.4,
          },
      },
  },
  particles: {
      color: {
          value: "#ffffff",
      },
      links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
      },
      collisions: {
          enable: true,
      },
      move: {
          directions: "none",
          enable: true,
          outModes: {
              default: "bounce",
          },
          random: false,
          speed: 3,
          straight: false,
      },
      number: {
          density: {
              enable: true,
              area: 800,
          },
          value: 50,
      },
      opacity: {
          value: 0.5,
      },
      shape: {
          type: "circle",
      },
      size: {
          value: { min: 1, max: 5 },
      },
  },
  detectRetina: true,
}

function App() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
      }, []);

      return (
    <div className="App">
      <div className='particles'><Particles  id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particleOptions}/></div>
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  )
}

export default App
