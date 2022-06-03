import { Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { DraggableItem } from "./DraggableItems/DraggableItems";
import { rgbToHex } from "../../../Utils/convertToHex";
import { DraggableContainer } from "./DraggableContainer/DraggableContainer";

export const Canvas = ({
  color,
  setColor,
  imageData,
  imageUrl,
  flag,
  pickerPos,
  setPickerPosition,
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

    setPickerPosition((prePos) => {
      return {
        ...prePos,
        [e.target.id]: { x: canvas.offsetLeft, y: canvas.offsetTop },
      };
    });

    let x = e.pageX - pos.x;
    let y = e.pageY - pos.y;

    const pixelData = context.getImageData(x, y, 1, 1).data;

    const pixelColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

    setColor((preData) => {
      return { ...preData, [e.target.id]: pixelColor };
    });
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
      const pixelData1 = context.getImageData(
        pickerPos.picker1.x,
        pickerPos.picker1.y,
        1,
        1
      ).data;
      const pixelData2 = context.getImageData(
        pickerPos.picker2.x,
        pickerPos.picker2.y,
        1,
        1
      ).data;
      const pixelData3 = context.getImageData(
        pickerPos.picker3.x,
        pickerPos.picker3.y,
        1,
        1
      ).data;
      const pixelData4 = context.getImageData(
        pickerPos.picker4.x,
        pickerPos.picker4.y,
        1,
        1
      ).data;
      const pixelData5 = context.getImageData(
        pickerPos.picker5.x,
        pickerPos.picker5.y,
        1,
        1
      ).data;

      const pixelColor1 = rgbToHex(pixelData1[0], pixelData1[1], pixelData1[2]);
      const pixelColor2 = rgbToHex(pixelData2[0], pixelData2[1], pixelData2[2]);
      const pixelColor3 = rgbToHex(pixelData3[0], pixelData3[1], pixelData3[2]);
      const pixelColor4 = rgbToHex(pixelData4[0], pixelData4[1], pixelData4[2]);
      const pixelColor5 = rgbToHex(pixelData5[0], pixelData5[1], pixelData5[2]);

      setColor({
        picker1: pixelColor1,
        picker2: pixelColor2,
        picker3: pixelColor3,
        picker4: pixelColor4,
        picker5: pixelColor5,
      });
    };
  };

  useEffect(() => {
    createCanvas();
  }, [flag, showRandomImage, imageUrl, imageData?.length]);

  return (
    <Box className="draggable-container">
      <canvas
        width="500px"
        height="600px"
        ref={canvasRef}
        style={{ borderRadius: "15px 15px 0 0" }}
      />
      <DraggableContainer mouseMoveHandler={mouseMoveHandler} color={color} />
    </Box>
  );
};
