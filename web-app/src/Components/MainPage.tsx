import React, { FormEvent, useState } from "react";
import { useMultistepForm } from "../Hooks/useMultistep";
import UploadVideoDetailForm from "./UploadVideoDetailForm";
import StepTwo from "./TermsAndConditionForm";
import TermsAndConditionForm from "./TermsAndConditionForm";

type FormData = {
  videoUrl: string;
  videoFileName: string;
  videoTitle: string;
  videoStartDateTime: string;
  videoLocation?: string;
  hasAgreedTermsCondition: boolean;
};

const INITIAL_DATA: FormData = {
  videoUrl: "",
  videoFileName: "",
  videoTitle: "",
  videoStartDateTime: "",
  videoLocation: "",
  hasAgreedTermsCondition: false,
};

export default function MainPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateData = (updatedFields: Partial<FormData>) => {
    setData((oldFields) => {
      return { ...oldFields, ...updatedFields };
    });
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const sendData = () => {
    console.log(selectedFile);
    var formData: any = new FormData();
    const xhr = new XMLHttpRequest();

    formData.append("videoFile", selectedFile);
    formData.append("videoTitle", data.videoTitle);
    formData.append("videoStartDateTime", data.videoStartDateTime);
    formData.append("videoLocation", data.videoLocation);

    xhr.open("POST", "http://localhost:3001/sendVideo/uploadFile", true);
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");

    xhr.send(formData);
  };

  const uploadToServer = () => {
    data.hasAgreedTermsCondition
      ? sendData()
      : alert("Please View and accept Terms and Condition");
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
      updateData={updateData}
    ></TermsAndConditionForm>,
  ]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    isLastStep ? uploadToServer() : proceedStage();
  };

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
      }}
    >
      <form onSubmit={onSubmitHandler}>
        <div
          style={{
            position: "absolute",
            top: ".5rem",
            right: ".5rem",
          }}
        >
          <p className="font-mono">
            Stage: {currentIndex + 1} / {steps.length}
          </p>
        </div>
        {step}

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
            padding: ".5rem",
            border: ".5rem",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={backStage}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Submit" : "Next"}</button>
        </div>
      </form>
    </div>
  );
}
