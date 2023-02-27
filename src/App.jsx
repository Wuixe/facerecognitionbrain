import { useState } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import { useCallback } from "react";
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import './App.css';



function App() {

    //state
    const [input, setInput] = useState('');
    const [imageURL, setImageURL] = useState('');


    const PAT = '';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';    
    const IMAGE_URL = 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';


    


    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onSubmit = () => {
        setImageURL(input);
        console.log('click');

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
        
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response)
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }



      return (
    <div className="App">
      <ParticlesBg color="#FFFFFF" num={50} type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition imageURL={imageURL}/>
    </div>
  )
}

export default App
