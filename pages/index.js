import { Container, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CanvasWithPalette, Header, UploadSection } from "../components";
import { getImageData } from "../Utils/getImage";

const initialPosition = {
  picker1: {
    x: 180,
    y: 80,
  },
  picker2: {
    x: 130,
    y: 200,
  },
  picker3: {
    x: 100,
    y: 120,
  },
  picker4: {
    x: 10,
    y: 210,
  },
  picker5: {
    x: 80,
    y: 100,
  },
};

const HomePage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [flag, setFlag] = useState(false);
  const [showRandomImage, setShowRandomImage] = useState(false);

  const [pickerPos, setPickerPosition] = useState(initialPosition);

  const imageApi = "https://api.unsplash.com/search/photos?query=";
  const completeImageAPI = `${imageApi}+nature&client_id=${process.env.NEXT_PUBLIC_API_KEY}`;

  const imageUploadHandler = (newImage) => {
    setUploadedImages(newImage);
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
    setUploadedImages([]);
  };

  useEffect(() => {
    getImageData(completeImageAPI, setImageUrl);
  }, [completeImageAPI]);

  return (
    <Container maxW="full" minH="100vh" backgroundColor="blue.50">
      <Container maxW="container.xl" p={0} paddingBottom="10">
        <Header />
        <Flex
          py={0}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          w="full"
        >
          <UploadSection
            uploadedImages={uploadedImages}
            imageUploadHandler={imageUploadHandler}
          />
          <CanvasWithPalette
            uploadedImages={uploadedImages}
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
