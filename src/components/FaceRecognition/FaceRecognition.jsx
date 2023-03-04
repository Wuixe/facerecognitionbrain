import './FaceRecognition.css';

const FaceRecognition = ({imageURL, boxes}) => {
    return (
        <div className="flex justify-center p-3">
            <div className='absolute'>
                <img id='inputimage' src={imageURL} alt="" width='500' height='auto' />
                {
                    boxes.map((box, index)=> (
                        <div key={index} className="bounding-box" style = {{top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol }}></div>
                    ))
                }
                
            </div>
           
        </div>
    )
}

export default FaceRecognition;