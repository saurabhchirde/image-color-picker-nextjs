import { useRef, useEffect, useState } from "react";
import { rgbToHex } from "../../../Utils/convertToHex";

export const Canvas = ({
  setColor,
  imageData,
  imageUrl,
  flag,
  showRandomImage,
}) => {
  const canvasRef = useRef(null);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const mouseMoveHandler = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    setPos((prePos) => {
      return { ...prePos, x: canvas.offsetLeft, y: canvas.offsetTop };
    });

    let x = e.pageX - pos.x;
    let y = e.pageY - pos.y;

    const pixelData = context.getImageData(x, y, 1, 1).data;

    const pixelColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    setColor(pixelColor);
  };

  const createCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.src = flag ? imageData[imageData.length - 1].data_url : imageUrl;

    image.crossOrigin = "Anonymous";
    image.onload = () => {
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
  };

  useEffect(() => {
    createCanvas();
  }, [flag, showRandomImage, imageUrl]);

  return (
    <canvas
      onMouseMove={mouseMoveHandler}
      width="500px"
      height="600px"
      ref={canvasRef}
    />
  );
};
