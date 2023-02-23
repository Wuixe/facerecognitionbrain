import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className="m-4 mt-0">
            <Tilt className="Tilt shadow-lg" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner p-5">
                    <img alt='logo' className="h-full w-full object-contain" src={brain}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
