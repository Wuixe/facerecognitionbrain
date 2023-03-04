import { useState, useCallback } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import './App.css';
import Signin from './components/Signin/Signin.jsx';
import Register from './components/Register/Register.jsx';



function App() {

    //state
    const [input, setInput] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);


    const PAT = 'd3ef2d5c8d1c43daa605c92d9154056e';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';    


    const calculateFaceLocation = (result) => {
        const data = JSON.parse(result).outputs[0].data.regions;
        const clarifaiFace = data[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        // console.log(data)
        // console.log(clarifaiFace)
        return {
            leftCol : Number(clarifaiFace.left_col) * width,
            topRow : Number(clarifaiFace.top_row)* height,
            rightCol : width - (Number(clarifaiFace.right_col) * width),
            bottomRow : height - (Number(clarifaiFace.bottom_row) * height)
        }

    }

    const displayFaceBox = useCallback((object) => {
        console.log(object);
        setBox(object);
    }, []);
    
    
      

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
                            "url": input
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
        .then(response => response.text())
        .then(result => displayFaceBox(calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
    }



    const onRouteChange = (rt) => {

        rt === 'home'? setIsSignedIn(true) : setIsSignedIn(false);
        setRoute(rt);
    }

      return (
        <div className="App"> 
          <ParticlesBg color="#FFFFFF" num={50} type="cobweb" bg={true} />
          <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
          {route === 'home' ? <>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
                <FaceRecognition box={box} imageURL={imageURL} />
            </> :
            route === 'signin' ? <Signin onRouteChange={onRouteChange}/> :
            <Register onRouteChange={onRouteChange}/> 
            }
        </div>
      );
}

export default App
