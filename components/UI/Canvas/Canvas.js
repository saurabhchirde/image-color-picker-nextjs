import { useRef, useEffect, useState } from "react";
import { convertToHex, rgbToHex } from "../../../Utils/convertToHex";

export const Canvas = ({
  setColor,
  imageData,
  imageUrl,
  flag,
  showRandomImage,
}) => {
  const canvasRef = useRef(null);

  const mouseMoveHandler = (e) => {
    const cols = canvasRef.current.width;
    const pixel = cols * e.pageX + e.pageY;
    const arrayPos = pixel;

    const colors = {
      red: canvasRef.current.data[arrayPos],
      green: canvasRef.current.data[arrayPos + 1],
      blue: canvasRef.current.data[arrayPos + 2],
    };

    const hexCode = rgbToHex(colors.red, colors.green, colors.blue);
    console.log(hexCode);
    setColor(hexCode);
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

      const pixelData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      canvasRef.current.data = pixelData.data;
    };
  };

  useEffect(() => {
    createCanvas();
  }, [flag, showRandomImage, imageUrl]);

  return (
    <canvas
      onClick={mouseMoveHandler}
      width="500px"
      height="600px"
      ref={canvasRef}
      id="canvas"
    />
  );
};
