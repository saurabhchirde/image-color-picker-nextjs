import { useRef, useEffect } from "react";
import { convertToHex } from "../../../Utils/convertToHex";

export const Canvas = ({ imageData, imageUrl, flag, showRandomImage }) => {
  const canvasRef = useRef(null);

  const mouseMoveHandler = (e) => {
    const context = e.target.getContext("2d");
    const pixelData = context.getImageData(e.pageX - 0, e.pageY - 0, 1, 1).data;

    const hexCode =
      "#" +
      convertToHex(pixelData[0]) +
      convertToHex(pixelData[1]) +
      convertToHex(pixelData[2]);
    console.log(hexCode);
  };

  const createCanvas = () => {
    const imageObj = new Image();
    const context = canvasRef.current.getContext("2d");
    imageObj.src = flag ? imageData[imageData.length - 1].data_url : imageUrl;
    imageObj.crossOrigin = "Anonymous";
    imageObj.onload = () =>
      context.drawImage(
        imageObj,
        80,
        0,
        imageObj.width,
        imageObj.height,
        0,
        0,
        550,
        600
      );
  };

  useEffect(() => {
    createCanvas();
  }, [flag, showRandomImage]);

  return (
    <canvas
      onClick={mouseMoveHandler}
      width="500px"
      height="600px"
      ref={canvasRef}
    />
  );
};
