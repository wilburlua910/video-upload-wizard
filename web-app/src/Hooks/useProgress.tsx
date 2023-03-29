import { useState } from "react";

export function useProgress() {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [byteSent, setByteSent] = useState(0);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  //Here we do our XHR request
  async function upload(selectedFile: File | null, data: any) {
    if (selectedFile && data) {
      let formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append("videoFile", selectedFile);
      formData.append("videoTitle", data.videoTitle);
      formData.append("videoStartDateTime", data.videoStartDateTime);
      formData.append("videoLocation", data.videoLocation);

      xhr.upload.onprogress = (e: ProgressEvent) => {
        let percentComplete = Math.ceil((e.loaded / e.total) * 100);
        setCurrentProgress(percentComplete);
        setByteSent(e.loaded / 1000000);

        console.log(currentProgress);
        console.log(byteSent);

        console.log(`Percent complete: ${percentComplete}`);
        console.log(
          `Current Progress ${e.loaded / 1000000} of ${e.total / 1000000} MB`
        );
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;

          if (status >= 200 && status < 400) {
            console.log("Success");
            setIsUploadSuccess(true);
            setIsError(false);

            setTimeout(() => window.location.reload(), 5000);
          } else {
            console.log("Error");
            setIsUploadSuccess(false);
            setIsError(true);
          }
        }
      };

      xhr.open("POST", "http://localhost:3001/sendVideo/uploadFile", true);
      // xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.send(formData);
    }
  }

  return {
    upload,
    currentProgress,
    byteSent,
    isUploadSuccess,
    isError,
  };
}
