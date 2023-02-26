import { useState } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import './App.css';
import Clarifai from "clarifai";

const app = new Clarifai.App({
    apiKey: 'fcd32579849648128bc56ebad0535040'
   });

// Section that I can't put anywhere else about the settings of my backgroud particles
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
          speed: 2,
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

    //state
    const [input, setInput] = useState('');
    const [imageURL, setImageURL] = useState('');

    //particle functions
    const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
      }, []);

    
    
    //Event functions 

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onSubmit = () => {
        setImageURL(input);
        console.log('click');
        
        app.models
        .predict(
          {
            id: 'face-detection',
            name: 'face-detection',
            version: '6dc7e46bc9124c5c8824be4822abe105',
            type: 'visual-detector',
          }, input)
        .then(response => {
          console.log('hi', response)
        })
        .catch(err => console.log(err));
    }



      return (
    <div className="App">
      <Particles className='particles' id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particleOptions}/>
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition imageURL={imageURL}/>
    </div>
  )
}

export default App
