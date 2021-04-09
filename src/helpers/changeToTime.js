const changeToTime = delta => {
  const h = toConvert(Math.floor(delta / 3600));
  const min = toConvert(Math.floor(delta / 60 - h * 60));
  const sec = toConvert(Math.floor(delta % 60));
  const fullTime = `${h} : ${min} : ${sec}`;
  return fullTime;
};
const toConvert = data => data.toString().padStart(2, '0');
export default changeToTime;
