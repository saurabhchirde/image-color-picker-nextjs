import { useRef, useEffect, useState } from "react";
import { convertToHex } from "../../../Utils/convertToHex";

export const Canvas = ({
  colorArray,
  imageData,
  imageUrl,
  flag,
  showRandomImage,
}) => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("");

  const mouseMoveHandler = (e) => {
    const context = e.target.getContext("2d");
    const pixelData = context.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    ).data;

    console.log(pixelData);

    const hexCode =
      "#" +
      convertToHex(pixelData[0]) +
      convertToHex(pixelData[1]) +
      convertToHex(pixelData[2]);
    console.log(hexCode);
    setColor(hexCode);
  };

  const createCanvas = () => {
    const image = new Image();
    const context = canvasRef.current.getContext("2d");
    image.src = flag ? imageData[imageData.length - 1].data_url : imageUrl;
    image.crossOrigin = "Anonymous";
    image.onload = () =>
      context.drawImage(
        image,
        80,
        0,
        image.width,
        image.height,
        0,
        0,
        550,
        600
      );
  };

  const takeColorHandler = () => {
    if (colorArray.length < 4) {
      colorArray.push({ colorHex: color });
    }
    // console.log(color);
  };

  useEffect(() => {
    createCanvas();
  }, [flag, showRandomImage, imageUrl]);

  return (
    <canvas
      onClick={takeColorHandler}
      onMouseMove={mouseMoveHandler}
      width="500px"
      height="600px"
      ref={canvasRef}
    />
  );
};
