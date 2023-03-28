import React, { useState, useRef } from "react";
import { importFileandPreview } from "@rajesh896/video-thumbnails-generator";
import { FormWrapper } from "./FormWrapper";
import { PhotoIcon } from "@heroicons/react/24/solid";

type VideoDetails = {
  videoUrl: string;
  videoFileName: string;
  videoTitle: string;
  videoStartDateTime: string;
  videoLocation?: string;
};

type UploadVideoDetailFormProps = VideoDetails & {
  updateData: (updatedFields: Partial<VideoDetails>) => void;
  onFileSelected: (file: File) => void;
};

export default function UploadVideoDetailForm({
  videoUrl,
  videoFileName,
  videoTitle,
  videoStartDateTime,
  videoLocation,
  updateData,
  onFileSelected,
}: UploadVideoDetailFormProps) {
  const [video, setVideo] = useState(null);

  const handleFileSelected = (e: any) => {
    updateData({
      videoFileName: e.target.files[0].name,
    });
    if (e.target.files[0]) {
      onFileSelected(e.target.files[0]);
      console.log(e.target.files[0]);
    }
    setVideo(e.target.files[0]);
  };

  const refs = useRef<any>({
    video: null,
  });

  React.useEffect(() => {
    if (video) {
      importFileandPreview(video).then((res) => {
        updateData({
          videoUrl: res,
        });
      });
      if (refs.current.video) {
        if (refs.current.video !== null) {
          refs.current.video.style.transform = "scale(1)";
        }
      }
    }
  }, [video]);

  return (
    <FormWrapper title="Step 1 - Upload File ">
      <div className="place-items-center">
        <video
          style={{
            maxWidth: 600,
            justifySelf: "center",
            maxHeight: 400,
            transform: "scale(1)",
            transition: "all 0.3s",
          }}
          id="video"
          ref={(el: any) => (refs.current.video = el)}
          src={videoUrl}
        >
          <source src={videoUrl} type="video/*" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="col-span-full">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={handleFileSelected}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              MP4, MOV, M4V files
            </p>

            <p className="text-xs leading-5 text-gray-600">
              File name: {videoFileName}
            </p>
          </div>
        </div>
      </div>

      <label>
        <p className="font-mono text-base">Video Title</p>
      </label>
      <input
        autoFocus
        required
        type="text"
        value={videoTitle}
        onChange={(e) =>
          updateData({
            videoTitle: e.target.value,
          })
        }
      />

      <label>
        <p className="font-mono text-base">Video Date & Time</p>
      </label>
      <input
        required
        type="datetime-local"
        value={videoStartDateTime.toString()}
        onChange={(e) =>
          updateData({
            videoStartDateTime: e.target.value,
          })
        }
      />

      <label>
        <p className="font-mono text-base">Video Location</p>
      </label>
      <input
        type="number"
        value={videoLocation}
        onChange={(e) =>
          updateData({
            videoLocation: e.target.value,
          })
        }
      />
    </FormWrapper>
  );
}
