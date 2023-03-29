import React, { FormEvent, useState } from "react";
import { useMultistepForm } from "../Hooks/useMultistep";
import UploadVideoDetailForm from "./UploadVideoDetailForm";
import TermsAndConditionForm from "./TermsAndConditionForm";
import { useProgress } from "../Hooks/useProgress";

type FormData = {
  videoUrl: string;
  videoFileName: string;
  videoTitle: string;
  videoStartDateTime: string;
  videoLocation?: string;
  hasAgreedTermsCondition: boolean;
  progress: number;
  totalByteSent: number;
};

const INITIAL_DATA: FormData = {
  videoUrl: "",
  videoFileName: "",
  videoTitle: "",
  videoStartDateTime: "",
  videoLocation: "",
  hasAgreedTermsCondition: false,
  progress: 0,
  totalByteSent: 0,
};

export default function MainPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { upload, currentProgress, byteSent, isUploadSuccess, isError } =
    useProgress();

  const updateData = (updatedFields: Partial<FormData>) => {
    setData((oldFields) => {
      return { ...oldFields, ...updatedFields };
    });
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const uploadToServer = async () => {
    if (data.hasAgreedTermsCondition) {
      await upload(selectedFile, data);
    } else {
      alert("Please read through and accept Terms and conditions");
    }
  };

  const {
    step,
    steps,
    currentIndex,
    isFirstStep,
    isLastStep,
    proceedStage,
    backStage,
  } = useMultistepForm([
    <UploadVideoDetailForm
      {...data}
      onFileSelected={handleFileSelect}
      updateData={updateData}
    ></UploadVideoDetailForm>,
    <TermsAndConditionForm
      {...data}
      progress={currentProgress}
      totalByteSent={byteSent}
      isUploadSuccess={isUploadSuccess}
      isError={isError}
      updateData={updateData}
    ></TermsAndConditionForm>,
  ]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (data.videoUrl === "") {
      alert("Please upload a video");
    } else {
      isLastStep ? uploadToServer() : proceedStage();
    }
  };

  return (
    <div>
      <form className="max-w-3xl mx-auto px-4" onSubmit={onSubmitHandler}>
        <div className="text-center mt-3.5">
          <p className="font-mono text font-bold tracking-tight text-gray-900 sm:text-3xl text-center mb-5">
            Step: {currentIndex + 1} / {steps.length}
          </p>
        </div>
        {step}

        <div className="flex justify-between">
          {!isFirstStep && (
            <button
              className="mb-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12 w-1/3"
              type="button"
              onClick={backStage}
            >
              Back
            </button>
          )}
          <button
            className="mb-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12 w-1/3"
            type="submit"
          >
            {isLastStep ? "Submit" : `Proceed to Step ${currentIndex + 2}`}
          </button>
        </div>
      </form>
    </div>
  );
}
