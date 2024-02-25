export const useHighlightText = (
  firstMistakeIndex,
  isSuccessfulAttempt,
  setMarkup,
  textExtract
) => {
  const highlightTextExtract = (inputValue) => {
    let newMarkup = textExtract;
    let isSuccessfulStart = inputValue[0] === textExtract[0];

    if (!(isSuccessfulStart & !isSuccessfulAttempt.current)) {
      let firstColor =
        !isSuccessfulStart && !isSuccessfulAttempt.current
          ? "#ef476f"
          : "#06d6a0";

      newMarkup = `<span style="background-color: ${firstColor};">${newMarkup.slice(
        0,
        inputValue.length
      )}</span>${newMarkup.slice(inputValue.length)}`;
    } else {
      newMarkup = `<span style="background-color: #06d6a0;">${newMarkup.slice(
        0,
        firstMistakeIndex.current
      )}</span><span style="background-color: #ef476f;">${newMarkup.slice(
        firstMistakeIndex.current,
        inputValue.length
      )}</span>${newMarkup.slice(inputValue.length)}`;
    }

    setMarkup(newMarkup);
  };

  return { highlightTextExtract };
};
