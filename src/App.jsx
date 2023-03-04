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
    const [boxes, setBoxes] = useState([]);
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);


    const PAT = '';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';    


    const calculateFaceLocation = (result) => {
        const data = JSON.parse(result).outputs[0].data.regions;

        
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        // console.log(data)
        // console.log(clarifaiFace)
        
        let boxArray = [];
        // console.log(data);
        data.map((item, key) => {
            // console.log(item)
            const clarifaiFace = item.region_info.bounding_box;
            boxArray.push({
                leftCol : Number(clarifaiFace.left_col) * width,
                topRow : Number(clarifaiFace.top_row)* height,
                rightCol : width - (Number(clarifaiFace.right_col) * width),
                bottomRow : height - (Number(clarifaiFace.bottom_row) * height)
            })
            // console.log(boxArray)
        })
            
            
        

        return boxArray;

    }

    const displayFaceBox = useCallback((boxArray) => {
        // console.log(boxArray);
        setBoxes(boxArray);
    }, []);
    
    
      

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onSubmit = () => {
        setImageURL(input);
        // console.log('click');

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
                {/* <p>{JSON.stringify(boxes)}</p> */}
                <FaceRecognition boxes={boxes} imageURL={imageURL} />
            </> :
            route === 'signin' ? <Signin onRouteChange={onRouteChange}/> :
            <Register onRouteChange={onRouteChange}/> 
            }
        </div>
      );
}

export default App
