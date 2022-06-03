import { Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { rgbToHex } from "../../../Utils/convertToHex";

export const Canvas = ({
  color,
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
  const [activePicker, setActivePicker] = useState();

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

    setColor((preData) => {
      return { ...preData, [e.target.id]: pixelColor };
    });
  };

  const createCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    console.log(context);

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
        Math.round(Math.random() * 10 + 1),
        Math.round(Math.random() * 10 + 1),
        1,
        1
      ).data;

      const pixelColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

      setColor({
        palette1: pixelColor,
        palette2: pixelColor,
        palette3: pixelColor,
        palette4: pixelColor,
        palette5: pixelColor,
      });
    };
  };

  useEffect(() => {
    createCanvas();
  }, [flag, showRandomImage, imageUrl]);

  return (
    <Box className="draggable-container">
      <canvas width="500px" height="600px" ref={canvasRef} />
      <Box position="absolute" w="500px" marginTop="-600px" display="flex">
        <Draggable
          bounds=".draggable-container"
          onStart={mouseMoveHandler}
          onDrag={mouseMoveHandler}
          defaultPosition={{ x: 80, y: 50 }}
        >
          <Box
            w={7}
            h={7}
            borderRadius="full"
            backgroundColor={color.palette1}
            id="palette1"
            border="2px solid white"
          />
        </Draggable>
        <Draggable
          bounds=".draggable-container"
          onStart={mouseMoveHandler}
          onDrag={mouseMoveHandler}
          defaultPosition={{ x: 10, y: 180 }}
        >
          <Box
            w={7}
            h={7}
            borderRadius="full"
            backgroundColor={color.palette2}
            id="palette2"
            border="2px solid white"
          />
        </Draggable>
        <Draggable
          bounds=".draggable-container"
          onStart={mouseMoveHandler}
          onDrag={mouseMoveHandler}
          defaultPosition={{ x: 300, y: 50 }}
        >
          <Box
            w={7}
            h={7}
            borderRadius="full"
            backgroundColor={color.palette3}
            id="palette3"
            border="2px solid white"
          />
        </Draggable>
        <Draggable
          bounds=".draggable-container"
          onStart={mouseMoveHandler}
          onDrag={mouseMoveHandler}
          defaultPosition={{ x: 300, y: 500 }}
        >
          <Box
            w={7}
            h={7}
            borderRadius="full"
            backgroundColor={color.palette4}
            id="palette4"
            border="2px solid white"
          />
        </Draggable>
        <Draggable
          bounds=".draggable-container"
          onStart={mouseMoveHandler}
          onDrag={mouseMoveHandler}
          defaultPosition={{ x: 100, y: 400 }}
        >
          <Box
            w={7}
            h={7}
            borderRadius="full"
            backgroundColor={color.palette5}
            id="palette5"
            border="2px solid white"
          />
        </Draggable>
      </Box>
    </Box>
  );
};
