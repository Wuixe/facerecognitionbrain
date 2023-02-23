import './ImageLinkForm.css';

const ImageLinkForm = () => {
    return (
        <div className="flex items-center  flex-col">
            <p className="text-lg flex justify-center">{'This Magic Brain will detext faces in your pictures. Give it a try!'}</p>
            <div className="w-1/2 mt-2 flex justify-center shadow-lg p-7 form rounded-md ">
                <input className="text-xl p-2 w-3/4" type='text' />
                <button type="button" className="mx-2 w-1/4 px-3 py-2 scale-105 hover:scale-110 inline-block text-white font-bold bg-purple-500 rounded hover:bg-purple-700">Detect</button>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;