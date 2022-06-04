import { Container, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CanvasWithPalette, Header, UploadSection } from "../components";
import { getImageData } from "../Utils/getImage";

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
    x: 350,
    y: 80,
  },
  picker4: {
    x: 200,
    y: 300,
  },
  picker5: {
    x: 80,
    y: 370,
  },
};

const HomePage = () => {
  const [imageData, setImageData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
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
  }, [completeImageAPI]);

  return (
    <Container maxW="full" minH="100vh" backgroundColor="blue.50">
      <Container maxW="container.xl" p={0} paddingBottom="10">
        <Header />
        <Flex
          py={10}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          w="full"
        >
          <UploadSection
            imageData={imageData}
            imageUploadHandler={imageUploadHandler}
          />
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
      </Container>
    </Container>
  );
};

export default HomePage;
