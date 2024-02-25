export const useValidateInput = (
  accuracy,
  firstMistakeIndex,
  isSuccessfulAttempt,
  setWordsPerMinute,
  stopStopwatch,
  textExtract,
  timeElapsed,
  totalMistakes
) => {
  const calculateAccuracy = () => {
    const totalCharacters = textExtract.trim().split("").length;
    accuracy.current = (
      ((totalCharacters - totalMistakes.current) / totalCharacters) *
      100
    ).toFixed(1);
  };

  const calculateWPM = () => {
    const totalWords = textExtract.trim().split(/\s+/).length;
    let totalMinutes = timeElapsed / 60000;
    setWordsPerMinute((totalWords / totalMinutes).toFixed(1));
  };

  const validateInput = (inputValue) => {
    if (
      isSuccessfulAttempt.current &&
      inputValue[inputValue.length - 1] !== textExtract[inputValue.length - 1]
    ) {
      firstMistakeIndex.current = inputValue.length - 1;
      isSuccessfulAttempt.current = false;
      totalMistakes.current = totalMistakes.current + 1;
    } else if (inputValue.length === firstMistakeIndex.current) {
      firstMistakeIndex.current = textExtract.length;
      isSuccessfulAttempt.current = true;
    }

    if (
      isSuccessfulAttempt.current &&
      inputValue.length === textExtract.length
    ) {
      stopStopwatch();
      calculateWPM();
      calculateAccuracy();
    }
  };

  return { accuracy, validateInput };
};
