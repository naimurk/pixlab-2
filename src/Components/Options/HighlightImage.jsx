import { useRef, useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function HighlightImage({ _img, setshowHighlight, content, id, setcontent }) {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);
    const [bgOpacity, setbgOpacity] = useState(0.6)

    useEffect(() => {
        if (_img.name) {

            setSrc(URL.createObjectURL(_img));
        } else if (_img) {
            setSrc(_img)
        }
    }, [])


    function onLoad(event) {
        const img = event.target;
        setImage(img)
    }

    const highlightImageNow = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.filter = `opacity(${Number(bgOpacity)})`;
        ctx.drawImage(image, 0, 0);

        // Calculate the scale factors
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        // Create a second canvas for the selected area
        const selectedCanvas = document.createElement('canvas');
        selectedCanvas.width = crop.width * scaleX;
        selectedCanvas.height = crop.height * scaleY;
        const selectedCtx = selectedCanvas.getContext('2d');

        // Draw the selected area of the original image onto the second canvas
        selectedCtx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        // Apply the brightness filter to the second canvas context
        selectedCtx.filter = `brightness(${Number(1.1)})`;
        selectedCtx.drawImage(selectedCanvas, 0, 0);

        // Add a blue border to the selected area
        selectedCtx.strokeStyle = 'dodgerblue';
        selectedCtx.lineWidth = 5;
        selectedCtx.strokeRect(0, 0, crop.width * scaleX, crop.height * scaleY);

        // Get the pixel data from the second canvas
        const imageData = selectedCtx.getImageData(
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        // Put the pixel data onto the first canvas at the position of the selected area
        ctx.putImageData(imageData, crop.x * scaleX, crop.y * scaleY);

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        setOutput(base64Image);

        let arr = [];
        for (let p = 0; p < content.length; p++) {

            if (content[p].id === id) {
                let tempobj = {
                    photo: base64Image,
                    id: content[p].id,
                    isDeleted: false,
                    shadow: content[p].shadow,
                    scolor: content[p].scolor,
                    br: content[p].br,
                    frame: content[p].frame,
                    size: content[p].size,
                    transform: content[p].transform,
                    component: "image",
                    position: content[p].position

                }
                arr.push(tempobj)
            } else {
                arr.push(content[p])
            }
        }
        setcontent(arr)
        setshowHighlight(false)
    };




    return (
        <div className="App">
            {src && (
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                    <ReactCrop style={{ width: "90%", margin: "0 auto" }} crop={crop}
                        onChange={c => setCrop(c)}>
                        <img onLoad={onLoad} src={src} />
                    </ReactCrop>
                </div>
            )}
            <div className='flex items-center justify-center m-4' >
                <label htmlFor="number-input" className="block text-sm font-medium text-gray-900 mr-4 ">Background Opacity</label>

                <input type="number" id="number-input" aria-describedby="helper-text-explanation" value={bgOpacity} onChange={(e) => setbgOpacity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5" placeholder="0.6"  min={0} max={1} step={0.1}  />

            </div>

            <button
                onClick={() => setshowHighlight(false)} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb-4 cursor-pointer mt-4 mr-4 "
            >
                Cancel
            </button>
            <button
                onClick={highlightImageNow} className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb-4 cursor-pointer mt-4 mr-4 "
            >
                Save changes
            </button>
        </div>
    );
}

