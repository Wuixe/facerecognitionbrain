const FaceRecognition = ({imageURL}) => {
    return (
        <div className="flex justify-center p-3">
            <img src={imageURL} alt="" width='500' height='auto' />
        </div>
    )
}

export default FaceRecognition;