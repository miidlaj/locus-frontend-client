import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ImageCrop from "./ImageCrop";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  width: 600,
  height: 600,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ResortImage = () => {

  const [openExtraImageModal, setOpenExtraImageModal] = React.useState(false);
  const [extraSelectedImages, setExtraSelectedImages] = React.useState<string[]>([]);

  const [selectedDefaultImage, setselectedDefaultImage] = React.useState('')
  const [openDefaultImageModal, setOpenDefaultImageModal] = React.useState(false);
  

  function deleteHandler(image: string) {
    setExtraSelectedImages(extraSelectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const [imageWantToBeCropped, setImageWantToBeCropped] = React.useState<any>(null);

  const defaultImageCropHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;
    setOpenDefaultImageModal(true);
    console.log(selectedFiles[0].type);
    setImageWantToBeCropped(URL.createObjectURL(selectedFiles[0]));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const extraImageCropHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;
    setOpenExtraImageModal(true);
    setImageWantToBeCropped(URL.createObjectURL(selectedFiles[0]));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const handleCroppedDefaultImage = (croppedImage: string) => {
        setselectedDefaultImage(croppedImage);
        setOpenDefaultImageModal(false);
  }

  const handleCroppedExtratImage = (croppedImage: string) => {
    setExtraSelectedImages((previousImages) => previousImages.concat(croppedImage));
    setOpenExtraImageModal(false);
}

  const handleClose = () => {
    setOpenExtraImageModal(false);
    setOpenDefaultImageModal(false)
  };
  return (
    <>
      <Modal
        open={openDefaultImageModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageCrop image={imageWantToBeCropped} handleCroppedImage={handleCroppedDefaultImage} />
        </Box>
      </Modal>

      <Modal
        open={openExtraImageModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageCrop image={imageWantToBeCropped} handleCroppedImage={handleCroppedExtratImage} />
        </Box>
      </Modal>

      <div className="lg:flex pt-10">
        <div className="lg:w-1/2 xl:max-w-screen-md m-autoitems-center">
          <div className="max-w-xl">
            <label className="flex justify-center w-full sm:h-64 h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Default Image.
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={defaultImageCropHandler}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="lg:w-1/2 xl:max-w-screen-md">
            {selectedDefaultImage && 
            <section className="overflow-hidden text-neutral-700">
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-auto flex-wrap">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="default"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src={selectedDefaultImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
            }
          
        </div>
      </div>

      <div className="lg:flex pt-10">
        <div className="lg:w-1/2 xl:max-w-screen-md m-autoitems-center">
          <div className="max-w-xl">
            <label className="flex justify-center w-full sm:h-64 h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  You can add upto 10 Extra Images
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={extraImageCropHandler}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="lg:w-1/2 xl:max-w-screen-md">
          {extraSelectedImages.length > 0 &&
            (extraSelectedImages.length > 10 ? (
              <p className="error">
                You can't upload more than 10 images! <br />
                <span>
                  please delete <b> {extraSelectedImages.length - 10} </b> of them{" "}
                </span>
              </p>
            ) : (
              <button
                className="upload-btn"
                onClick={() => {
                  console.log(extraSelectedImages);
                }}
              >
                UPLOAD {extraSelectedImages.length} IMAGE
                {extraSelectedImages.length === 1 ? "" : "S"}
              </button>
            ))}

          <section className="overflow-hidden text-neutral-700">
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div className="-m-1 flex flex-wrap md:-m-2">
                {extraSelectedImages &&
                  extraSelectedImages.map((image, index) => {
                    return (
                      <>
                        <div className="flex w-1/3 flex-wrap">
                          <div className="w-full p-1 md:p-2" key={image}>
                            <img
                              alt="gallery"
                              className="block h-full w-full rounded-lg object-cover object-center"
                              src={image}
                            />

                            <button onClick={() => deleteHandler(image)}>
                              Delete image
                            </button>
                            <p>{index + 1}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ResortImage;
