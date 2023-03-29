import React, { useState, useRef } from "react";
import { importFileandPreview } from "@rajesh896/video-thumbnails-generator";
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
    <div className="flex flex-col">
      <div className="col-span-full pt-5 pb-5">
        <p className="font-mono text-gray-900 text-2xl font-bold mb-5 text-center">
          Select File to Upload
        </p>
        <p className="font-mono text-gray-900 text-2xl font-bold mb-5 text-center"></p>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-12">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-16 w-16 text-gray-400"
              aria-hidden="true"
            />
            <div className="mt-4 text-md text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-blue-600"
              >
                <span className="text-center m-4">Click here to upload</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={handleFileSelected}
                />
              </label>
            </div>
            <p className="text-sm leading-5 text-gray-600">
              MP4, MOV, M4V files
            </p>

            <p className="text-sm font-medium leading-5 text-gray-600 mt-5">
              Selected File Name: {videoFileName}
            </p>
          </div>
        </div>
      </div>

      <div>
        <video
          id="video"
          height={600}
          ref={(el: any) => (refs.current.video = el)}
          src={videoUrl}
        >
          <source src={videoUrl} type="video/*" />
          Your browser does not support the video tag.
        </video>
      </div>

      <label>
        <p className="font-mono text-gray-900 text-2xl font-bold mb-5 mt-10 text-center">
          Please fill in the video details
        </p>

        <div className="flex flex-row">
          <p className="font-mono text-gray-900 text-lg font-bold mb-2">
            1. Video Title
          </p>
          <p className="text-red-600">*</p>
        </div>
      </label>
      <input
        className="shadow border rounded mb-5 w-full"
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
        <div className="flex flex-row">
          <p className="font-mono text-gray-900 text-lg font-bold mb-2">
            2. Video Start Date Time
          </p>
          <p className="text-red-600">*</p>
        </div>
      </label>
      <input
        className="shadow border rounded mb-5 w-full"
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
        <p className="font-mono text-gray-900 text-lg font-bold mb-2">
          3. Video Location
        </p>
      </label>
      <input
        className="shadow border rounded w-full mb-10"
        type="number"
        value={videoLocation}
        onChange={(e) =>
          updateData({
            videoLocation: e.target.value,
          })
        }
      />
    </div>
  );
}
