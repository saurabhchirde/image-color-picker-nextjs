import { Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { rgbToHex } from "../../../Utils/convertToHex";
import { DraggableContainer } from "./DraggableContainer/DraggableContainer";

export const Canvas = ({
  color,
  setColor,
  uploadedImages,
  imageUrl,
  flag,
  pickerPos,
}) => {
  const canvasRef = useRef(null);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  let averageColor = { r: 0, g: 0, b: 0 };
  let totalCount = 0;

  let averageHeight = 4;
  let averageWidth = 4;

  const mouseMoveHandler = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    setPos((prePos) => {
      return { ...prePos, x: canvas.offsetLeft, y: canvas.offsetTop };
    });

    let x = e.pageX - pos.x;
    let y = e.pageY - pos.y;

    const pixelData = context.getImageData(
      x,
      y,
      averageWidth,
      averageHeight
    ).data;

    const pixelColor = getAverageColor(pixelData);

    setColor((preData) => {
      return { ...preData, [e.target.id]: pixelColor };
    });
  };

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

  const createCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.src = flag
      ? uploadedImages[uploadedImages.length - 1].data_url
      : imageUrl;

    image.crossOrigin = "Anonymous";
    image.onload = () => {
      context.drawImage(image, 0, 0, image.width, image.height, 0, 0, 500, 500);
      initialPositionColor(context);
    };
  };

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
      picker1: getAverageColor(pixelData1),
      picker2: getAverageColor(pixelData2),
      picker3: getAverageColor(pixelData3),
      picker4: getAverageColor(pixelData4),
      picker5: getAverageColor(pixelData5),
    });
  };

  useEffect(() => {
    createCanvas();
  }, [flag, imageUrl, uploadedImages?.length]);

  return (
    <Box className="draggable-container">
      <canvas
        className="canvas"
        height="500px"
        width="500px"
        ref={canvasRef}
        style={{ borderRadius: "15px 15px 0 0" }}
      />
      <DraggableContainer
        mouseMoveHandler={mouseMoveHandler}
        color={color}
        pickerPos={pickerPos}
      />
    </Box>
  );
};
