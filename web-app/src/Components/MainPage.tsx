import React, { FormEvent, useState } from "react";
import { useMultistepForm } from "../Hooks/useMultistep";
import UploadVideoDetailForm from "./UploadVideoDetailForm";
import StepTwo from "./TermsAndConditionForm";
import TermsAndConditionForm from "./TermsAndConditionForm";

type FormData = {
  videoTitle: string;
  videoStartDateTime: string;
  videoLocation?: string;
  hasAgreedTermsCondition: boolean;
};

const INITIAL_DATA: FormData = {
  videoTitle: "",
  videoStartDateTime: "",
  videoLocation: "",
  hasAgreedTermsCondition: false,
};

export default function MainPage() {
  const [data, setData] = useState(INITIAL_DATA);

  const updateData = (updatedFields: Partial<FormData>) => {
    setData((oldFields) => {
      return { ...oldFields, ...updatedFields };
    });
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
      updateData={updateData}
    ></UploadVideoDetailForm>,
    <TermsAndConditionForm
      {...data}
      updateData={updateData}
    ></TermsAndConditionForm>,
  ]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    proceedStage();
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
