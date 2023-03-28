import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function proceedStage() {
    setCurrentIndex((i) => {
      return i >= steps.length - 1 ? i : i + 1;
    });
  }

  function backStage() {
    setCurrentIndex((i) => {
      return i <= 0 ? i : i - 1;
    });
  }

  function goToStage(i: number) {
    setCurrentIndex(i);
  }

  return {
    step: steps[currentIndex],
    steps,
    currentIndex,
    proceedStage,
    backStage,
    goToStage,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === steps.length - 1,
  };
}
