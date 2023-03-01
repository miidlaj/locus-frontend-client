import { useCallback, useState } from "react";
import Slider from "@mui/material/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";

const ImageCrop = ({ image, handleCroppedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);

      console.log("donee", { croppedImage });
      console.log(typeof croppedImage);
      handleCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image, handleCroppedImage]);

  return (
    <div>
      <button
        style={{
          display: image === null ? "none" : "block",
        }}
        onClick={showCroppedImage}
        className="z-10 cursor-pointer w-full bg-black text-white px-2 h-16 mb-5"
      >
        Crop
      </button>
      <div
        className="flex flex-col relative"
        style={{
          display: image === null ? "none" : "block",
        }}
      >
        <div className="h-96 w-96">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={1/1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex justify-center flex-col absolute bottom-0 w-full">
          <label className="font-bold">
            Zoom
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              className="range w-40 text-black"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageCrop;
