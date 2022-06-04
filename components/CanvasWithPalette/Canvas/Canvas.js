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
  showRandomImage,
}) => {
  const canvasRef = useRef(null);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  const [canvasDimention, setCanvasDimention] = useState({
    width: 500,
    height: 500,
  });

  let averageColor = { r: 0, g: 0, b: 0 };
  let totalCount = 0;

  let averageHeight = 8;
  let averageWidth = 8;

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
      context.clearRect(0, 0, canvas.width, canvas.height);
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
  }, [flag, imageUrl, uploadedImages?.length, showRandomImage]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
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
        canvasDimention={canvasDimention}
      />
    </Box>
  );
};
