import { setFips } from "crypto";
import React from "react";
import { useMultistepForm } from "../Hooks/useMultistep";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";

export default function SampleForm() {
  const {
    step,
    steps,
    currentIndex,
    isFirstStep,
    isLastStep,
    proceedStage,
    backStage,
  } = useMultistepForm([<FormOne></FormOne>, <FormTwo></FormTwo>]);
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
      <form>
        <div
          style={{
            position: "absolute",
            top: ".5rem",
            right: ".5rem",
          }}
        >
          {currentIndex + 1} / {steps.length}
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

          <button type="button" onClick={proceedStage}>
            {isLastStep ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
