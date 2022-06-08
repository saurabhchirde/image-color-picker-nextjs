import { Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { usePebble } from "../../../context/PebbleContext";
import { rgbToHex } from "../../../Utils/convertToHex";
import { DraggableContainer } from "./DraggableContainer/DraggableContainer";
import * as Vibrant from "node-vibrant";

export const Canvas = () => {
  const {
    uploadedImages,
    imageUrl,
    flag,
    pickerPos,
    setColor,
    setExtractedColors,
    showPicker,
  } = usePebble();

  const canvasRef = useRef(null);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const [canvasDimention, setCanvasDimention] = useState({
    width: 500,
    height: 500,
  });

  // inital average color
  let averageColor = { r: 0, g: 0, b: 0 };
  let totalCount = 0;

  let averageHeight = 8;
  let averageWidth = 8;

  // To catch users mouse movement
  const mouseMoveHandler = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    setPos((prePos) => {
      return { ...prePos, x: canvas.offsetLeft, y: canvas.offsetTop };
    });

    let x = e.pageX - pos.x;
    let y = e.pageY - pos.y;

    // Pixel data from current mouse position
    const pixelData = context.getImageData(
      x,
      y,
      averageWidth,
      averageHeight
    ).data;

    // Average color of 8*8 box
    const pixelColor = getAverageColor(pixelData);

    setColor((preData) => {
      return { ...preData, [e.target.id]: pixelColor };
    });
  };

  // To calculate average color
  const getAverageColor = (pixelData) => {
    const pixelDataLength = pixelData.length;

    for (let i = 0; i < pixelDataLength; i += 4) {
      averageColor.r += pixelData[i];
      averageColor.g += pixelData[i + 1];
      averageColor.b += pixelData[i + 2];
      totalCount++;
    }

    averageColor.r = Math.round(averageColor.r / totalCount);
    averageColor.g = Math.round(averageColor.g / totalCount);
    averageColor.b = Math.round(averageColor.b / totalCount);

    return rgbToHex(averageColor.r, averageColor.g, averageColor.b);
  };

  // Creating canvas on page load
  const createCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.src = flag
      ? uploadedImages[uploadedImages.length - 1].data_url
      : imageUrl;

    image.crossOrigin = "Anonymous";
    image.onload = () => {
      // clear previous canvas to draw new image
      context.clearRect(0, 0, canvas.width, canvas.height);

      // To set the Canvas size as per image
      const whRatio = image.width / image.height;
      let newWidth = canvas.width;
      let newHeight = newWidth / whRatio;
      if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = newHeight * whRatio;
      }
      let xOffset = newWidth < canvas.width ? (canvas.width - newWidth) / 2 : 0;
      let yOffset =
        newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0;

      setCanvasDimention({ width: newWidth, height: newHeight });

      context.drawImage(image, xOffset, yOffset, newWidth, newHeight);

      // extract vibrant colors from image
      let vibrantColors = new Vibrant(image.src);
      vibrantColors.getPalette((err, palette) => {
        setExtractedColors({
          available: true,
          color1: palette.Vibrant.hex,
          color2: palette.LightVibrant.hex,
          color3: palette.DarkVibrant.hex,
          color4: palette.Muted.hex,
          color5: palette.LightMuted.hex,
        });
      });

      initialPositionColor(context);
    };
  };

  // To set initial position color on drag handles
  const initialPositionColor = (context) => {
    const pixelData1 = context.getImageData(
      pickerPos.picker1.x,
      pickerPos.picker1.y,
      averageWidth,
      averageHeight
    ).data;
    const pixelData2 = context.getImageData(
      pickerPos.picker2.x,
      pickerPos.picker2.y,
      averageWidth,
      averageHeight
    ).data;
    const pixelData3 = context.getImageData(
      pickerPos.picker3.x,
      pickerPos.picker3.y,
      averageWidth,
      averageHeight
    ).data;
    const pixelData4 = context.getImageData(
      pickerPos.picker4.x,
      pickerPos.picker4.y,
      averageWidth,
      averageHeight
    ).data;
    const pixelData5 = context.getImageData(
      pickerPos.picker5.x,
      pickerPos.picker5.y,
      averageWidth,
      averageHeight
    ).data;

    setColor({
      picker1: rgbToHex(pixelData1[0], pixelData1[1], pixelData1[2]),
      picker2: rgbToHex(pixelData2[0], pixelData2[1], pixelData2[2]),
      picker3: rgbToHex(pixelData3[0], pixelData3[1], pixelData3[2]),
      picker4: rgbToHex(pixelData4[0], pixelData4[1], pixelData4[2]),
      picker5: rgbToHex(pixelData5[0], pixelData5[1], pixelData5[2]),
    });
    2;
  };

  useEffect(() => {
    createCanvas();
  }, [flag, imageUrl, uploadedImages?.length]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <canvas className="canvas" height="500px" width="500px" ref={canvasRef} />
      {showPicker && (
        <DraggableContainer
          mouseMoveHandler={mouseMoveHandler}
          canvasDimention={canvasDimention}
        />
      )}
    </Box>
  );
};
