import { useState } from "react";
import Cropper from "react-easy-crop";

function FileTypeInput({ register, name, label, multiple }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    console.log("crop", crop);
  };

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="form-group cms-form-group">
      <label className="form-label">{label}</label>
      <div className="d-flex align-items-end">
        <input
          {...register(name)}
          className="form-control image-input"
          type="file"
          accept="image/*"
          name={name}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
      <div className="position-relative">
        {file && (
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
      {/* <p className="text-danger">{errorsNew?.image1?.message}</p>
      {imageLengthError && (
        <p className="text-danger">Please select two images</p>
      )} */}
    </div>
  );
}

export default FileTypeInput;
