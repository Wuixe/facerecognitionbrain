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
    const [isImage, setIsImage] = useState(true)
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
    
    const testURL = async () => {
        try {
            const response = await fetch(input);
            const contentType = response.headers.get('Content-Type');
            return contentType.startsWith('image/');
        }catch (error) {
            return false;
        }
    }
      

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onSubmit = async() => {
        setImageURL(input);
        // console.log('click');
        const isImageUrl = await testURL(input);

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
        
        if (isImageUrl){
            setIsImage(true);
            fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
            .then(response => response.text())
            .then(result => displayFaceBox(calculateFaceLocation(result)))
            .catch(error => console.log('error', error));
        }
        else setIsImage(false);
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
                {
                    isImage ? <FaceRecognition boxes={boxes} imageURL={imageURL} /> :
                    <p className='flex justify-center p-3 text-xl font-bold text-red-700'>Please enter a valid image URL</p>
                }
                
            </> :
            route === 'signin' ? <Signin onRouteChange={onRouteChange}/> :
            <Register onRouteChange={onRouteChange}/> 
            }
        </div>
      );
}

export default App
