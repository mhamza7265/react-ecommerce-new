function FileTypeInput({ register, name, multiple }) {
  return (
    <div className="form-group">
      <label className="form-label">
        Image <span className="text-muted">(select two)</span>
      </label>
      <div className="d-flex align-items-end">
        <input
          {...register(name)}
          className="form-control image-input"
          type="file"
          name="image1"
          multiple={multiple}
          //   onChange={handleFileChange}
        />
        {/* {imageFile && (
          <div className="d-flex align-items-end">
            <img
              className="prof-pic ms-3"
              style={{ borderRadius: "50%" }}
              src={imageFile.image1}
            />
            {imageFile?.image2 && (
              <img
                className="prof-pic ms-3"
                style={{ borderRadius: "50%" }}
                src={imageFile.image2}
              />
            )}
          </div>
        )} */}
      </div>
      {/* <p className="text-danger">{errorsNew?.image1?.message}</p>
      {imageLengthError && (
        <p className="text-danger">Please select two images</p>
      )} */}
    </div>
  );
}

export default FileTypeInput;
