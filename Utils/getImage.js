export const getImageData = async (fullImgApi, setImageUrl) => {
  const randomImage = Math.trunc(Math.random() * 10);
  const response = await fetch(fullImgApi);
  const json = await response.json();
  setImageUrl(json.results[randomImage].urls.regular);
};
