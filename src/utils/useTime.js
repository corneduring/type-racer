import { useState, useRef } from "react";

export const useTime = (
  accuracy,
  firstMistakeIndex,
  inputRef,
  isSuccessfulAttempt,
  setMarkup,
  setWordsPerMinute,
  textExtract,
  totalMistakes
) => {
  const [attemptStarted, setAttemptStarted] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  let stopwatch = useRef();

  const displayTimeElapsed = (epoc) => {
    let minutes = Math.floor(epoc / 60000)
      .toString()
      .padStart(2, "0");
    let seconds = Math.floor((epoc % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    let milliSeconds = Math.floor((epoc % 1000) / 100).toString();

    return `${minutes}:${seconds}.${milliSeconds}`;
  };

  const resetStopwatch = () => {
    clearInterval(stopwatch.current);
    setTimeElapsed(0);
    setAttemptStarted(false);
    setInputDisabled(false);
    inputRef.current.value = "";
    setMarkup(textExtract);
    setWordsPerMinute(0);
    firstMistakeIndex.current = textExtract.length;
    isSuccessfulAttempt.current = true;
    totalMistakes.current = 0;
    accuracy.current = 0;
  };

  const startStopwatch = () => {
    if (!attemptStarted) {
      setAttemptStarted(true);
      let now = Date.now();

      stopwatch.current = setInterval(() => updateTimeElapsed(now), 1);
    }
  };

  const stopStopwatch = () => {
    if (attemptStarted) {
      clearInterval(stopwatch.current);
      setInputDisabled(true);
    }
  };

  const updateTimeElapsed = (startTime) => {
    setTimeElapsed(Date.now() - startTime);
  };

  return {
    displayTimeElapsed,
    inputDisabled,
    resetStopwatch,
    startStopwatch,
    stopStopwatch,
    timeElapsed,
  };
};
