export default function useTimeout() {
  const timeList = [];

  const setTimer = (timeID) => {
    timeList.push(timeID);
  };

  const clearTimer = () => {
    timeList.forEach((timeId) => {
      clearTimeout(timeId);
    });
  };

  return {
    setTimer,
    clearTimer,
  };
}
