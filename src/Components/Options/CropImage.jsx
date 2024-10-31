import { useRef, useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function CropImage({ _img, setshowcropModal, id, content, setcontent }) {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);


    useEffect(() => {

        if (_img.name) {

            setSrc(URL.createObjectURL(_img));
        } else if (_img) {
            setSrc(_img)
        }
    }, [])



    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        setOutput(base64Image);
        console.log(content)

        let arr = []
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
        console.log(arr)

        setshowcropModal(false)
        // console.log(base64Image)
    };

    function onLoad(event) {
        const img = event.target;
        setImage(img)
    }

    return (
        <div className="App">
           
            {src && (
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                    <ReactCrop style={{ width: "100%", margin: "0 auto" }} crop={crop}
                        onChange={c => setCrop(c)}>
                        <img onLoad={onLoad} src={src} style={{ width: "100%" }} />
                    </ReactCrop>
                </div>
            )}

                <button
                    onClick={() => setshowcropModal(false)} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb-4 cursor-pointer mt-4 mr-4 "
                >
                    Cancel
                </button>
                <button
                    onClick={cropImageNow} className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb-4 cursor-pointer mt-4 mr-4 "
                >
                    Save changes
                </button>
        </div>
    );
}

