import {
  Container,
  VStack,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Box,
} from "@chakra-ui/react";
import ImageUploading from "react-images-uploading";
import { useState, useEffect } from "react";
import { CanvasWithPalette, UploadSection } from "../components";
import { getImageData } from "../Utils/getImage";
import { saveAs } from "file-saver";

const initialPosition = {
  picker1: {
    x: 80,
    y: 50,
  },
  picker2: {
    x: 10,
    y: 180,
  },
  picker3: {
    x: 300,
    y: 250,
  },
  picker4: {
    x: 300,
    y: 500,
  },
  picker5: {
    x: 100,
    y: 400,
  },
};

const HomePage = () => {
  const [imageData, setImageData] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1612808375766-b63ce23ae7f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  );
  const [flag, setFlag] = useState(false);
  const [showRandomImage, setShowRandomImage] = useState(false);
  const [color, setColor] = useState({
    picker1: "",
    picker2: "",
    picker3: "",
    picker4: "",
    picker5: "",
  });

  const [pickerPos, setPickerPosition] = useState(initialPosition);

  const imageApi = "https://api.unsplash.com/search/photos?query=";
  const completeImageAPI = `${imageApi}+city&client_id=${process.env.NEXT_PUBLIC_API_KEY}`;

  const imageUploadHandler = (newImage) => {
    setImageData(newImage);
    setImageUrl("");
    if (newImage.length > 0) {
      setFlag(true);
      setShowRandomImage(false);
    }
  };

  const randomImageHandler = () => {
    setFlag(false);
    setPickerPosition(initialPosition);
    setShowRandomImage((pre) => !pre);
    getImageData(completeImageAPI, setImageUrl);
    setImageData([]);
  };

  useEffect(() => {
    getImageData(completeImageAPI, setImageUrl);
  }, []);

  return (
    <Container minH="100vh" maxW="full" p={0} paddingBottom="10">
      <Flex
        w="full"
        py={10}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <UploadSection
          imageData={imageData}
          imageUploadHandler={imageUploadHandler}
        />
        <Flex w="container.sm" justifyContent="center">
          <CanvasWithPalette
            color={color}
            setColor={setColor}
            imageData={imageData}
            imageUrl={imageUrl}
            flag={flag}
            pickerPos={pickerPos}
            setPickerPosition={setPickerPosition}
            showRandomImage={showRandomImage}
            randomImageHandler={randomImageHandler}
          />
        </Flex>
      </Flex>
      <Text textAlign="center" marginBottom={5}>
        made with ❤️ by
        <a href="https://twitter.com/SaurabhChirde">Saurabh Chirde</a>
      </Text>
    </Container>
  );
};

export default HomePage;
