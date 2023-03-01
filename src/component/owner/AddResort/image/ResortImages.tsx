import React from "react";
import "./ImageUpload.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ImageCrop from "./ImageCrop";
import imageCompression from "browser-image-compression";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import ResortImageService from "../../../../services/resort/image.service";

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

const ResortImages = () => {
  // const [infoAlert, setInfoAlert] = React.useState(true);
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const [uploading, setUploading] = React.useState(false);

  type alertType = {
    show: boolean;
    message: string;
    type: "warning" | "info" | "error" | "success";
  };
  const [alert, setAlert] = React.useState<alertType>({
    show: false,
    message: "",
    type: "info",
  });

  const [imageWantToBeCropped, setImageWantToBeCropped] =
    React.useState<any>(null);

  const imageCropHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedImages.length > 11) {
      setAlert({
        message:"Cannot upload more than 10 Extra Images",
        type: "warning",
        show: true
      })
      return;
    }
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;
    const imageFile = selectedFiles[0];

    //Image Type Check
    if (!imageFile.type.match("image.*")) {
      setAlert({
        message: "Unsupported File type.",
        type: "warning",
        show: true,
      });
      return;
    }

    //Image compression
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    const imageSizeInMB = imageFile.size / 1024 / 1024;

    if (imageSizeInMB > 1) {
      setAlert({
        message: "Selected Image will be compressed.",
        type: "info",
        show: true,
      });
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        setOpenImageModal(true);
        setImageWantToBeCropped(URL.createObjectURL(compressedFile));
      } catch (error) {
        setAlert({
          message: "Cannot compress Image. " + error,
          type: "error",
          show: true,
        });
        console.log(error);
      }
    } else {
      setOpenImageModal(true);
      console.log(imageFile);

      setImageWantToBeCropped(URL.createObjectURL(imageFile));
    }

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const deleteHandler = (image: string) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };
  const handleCroppedImage = (croppedImage: string) => {
    setSelectedImages((previousImages) => previousImages.concat(croppedImage));
    setOpenImageModal(false);
  };

  const handleClose = () => {
    setOpenImageModal(false);
  };

  const clearAllImageHandler = () => {
    setSelectedImages([]);
  };

  const uploadHandler = () => {
    if (selectedImages.length > 11) {
      setAlert({
        message:"Cannot upload more than 10 Extra Images",
        type: "warning",
        show: true
      })
      return;
    }

    setUploading(true);    
    selectedImages.forEach((image, index) => {
      const formData = new FormData();
      index++;
      fetch(image)
        .then((response) => response.blob())
        .then((blob) => {
          if (index === 1) {
            const file = new File([blob], index.toString(), {
              type: blob.type,
            });
            formData.append("image", file);
            formData.append("resortId", "1");
            sendDefaultImageRequest(formData);
          } else {
            const file = new File([blob], index.toString(), {
              type: blob.type,
            });
            formData.append("image", file);
            formData.append("resortId", "1");
            ResortImageService.setExtraImage(formData)
              .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                  setAlert({
                    message: index + "Image uploaded Successfully",
                    type: "success",
                    show: true,
                  });
                }
              })
              .catch((error) => {
                console.log(error);

                setAlert({
                  message: error.toString(),
                  type: "error",
                  show: true,
                });
              });


          }
        })
        .catch((error) => {
          setAlert({
            message: error.toString(),
            type: "error",
            show: true,
          });
          console.error(error);
        });
      // convertBlobLinkToFile(image, index.toString())
      //   .then((file) => {
      //     if (index === 0) {
      //       formData.append("image", file);
      //       formData.append("resortId", "1");
      //       sendDefaultImageRequest(formData);
      //     }
      //   })
      //   .catch((error) => {
      //     setAlert({
      //       message: error.toString(),
      //       type: "error",
      //       show: true,
      //     });
      //   });
    });
  };

  const sendDefaultImageRequest = (formData: FormData) => {
    ResortImageService.setDefaultImage(formData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setAlert({
            message: " Image uploaded Successfully",
            type: "success",
            show: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);

        setAlert({
          message: error.toString(),
          type: "error",
          show: true,
        });
      });
  };

  async function convertBlobLinkToFile(
    blobLink: string,
    filename: string
  ): Promise<File> {
    // Fetch the blob data
    const response = await fetch(blobLink);
    const blobData = await response.blob();

    // Create a new blob from the data and set the filename
    const blob = new Blob([blobData], { type: blobData.type });
    const blobWithName = blob as Blob & { name?: string };
    blobWithName.name = filename;

    // Create a new file from the blob
    const file = new File([blobWithName], filename, { type: blob.type });
    console.log(file);

    return file;
  }

  return (
    <>
      <Modal
        open={openImageModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageCrop
            image={imageWantToBeCropped}
            handleCroppedImage={handleCroppedImage}
          />
        </Box>
      </Modal>
      <div className="h-screen w-full sm:pr-7">
        {/* Alert */}
        {alert.show && (
          <Collapse in={alert.show}>
            <Alert
              severity={alert.type}
              action={
                <IconButton
                  aria-label="close"
                  color={alert.type}
                  size="small"
                  onClick={() => {
                    setAlert({
                      message: "",
                      show: false,
                      type: "info",
                    });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alert.message}
            </Alert>
          </Collapse>
        )}

        <main className="container h-full">
          {/* file upload modal */}
          <article
            aria-label="File Upload Modal"
            className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
          >
            {/* overlay */}
            <div
              id="overlay"
              className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
            >
              <i>
                <svg
                  className="fill-current w-12 h-12 mb-3 text-blue-700"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                </svg>
              </i>
              <p className="text-lg text-blue-700">Drop file to upload</p>
            </div>
            {/* scroll area */}
            <section className="h-full overflow-auto p-8 w-full flex flex-col">
              <div className="">
                <label className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center bg-white rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
                      <span className="font-semibold text-teal-900">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      You can add upto 1 Default Image & 10 Extra Images. (Image
                      will be cropped in 1:1 ratio)
                    </p>
                    <p className="text-xs text-red-800  text-center">
                      First Image will be the default Image*
                    </p>
                  </div>

                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={imageCropHandler}
                    className="hidden"
                  />
                </label>
              </div>

              <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                To Upload
              </h1>
              <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                {(selectedImages.length === 0 || !selectedImages) && (
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col justify-center items-center"
                  >
                    <img
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      alt="no data"
                    />
                    <span className="text-small text-gray-500">
                      No files selected
                    </span>
                  </li>
                )}

                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <li
                        className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-32"
                        key={index}
                      >
                        <article
                          tabIndex={0}
                          className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
                        >
                          <img
                            alt="upload preview"
                            className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                            src={image}
                          />

                          <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                            <h1 className="flex-1">
                              {index + 1}{" "}
                              <span>
                                &nbsp;&nbsp;{" "}
                                {index + 1 === 1 ? "Default Image" : ""}
                              </span>
                            </h1>

                            <div className="flex">
                              <span className="p-1">
                                <i>
                                  <svg
                                    className="fill-current w-4 h-4 ml-auto pt-"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                  </svg>
                                </i>
                              </span>
                              <button
                                className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
                                onClick={() => deleteHandler(image)}
                              >
                                <svg
                                  className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    className="pointer-events-none"
                                    d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </section>
                        </article>
                      </li>
                    );
                  })}
              </ul>
            </section>
            {/* sticky footer */}
            <footer className="flex justify-end px-8 pb-8 pt-4">
              <button
                id="submit"
                onClick={uploadHandler}
                className="rounded-sm px-3 py-1 bg-teal-900 hover:bg-teal-500 text-white focus:shadow-outline focus:outline-none"
              >
                Upload now
              </button>
              <button
                id="cancel"
                className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={clearAllImageHandler}
              >
                Clear
              </button>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
};

export default ResortImages;
