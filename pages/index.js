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
import { FiDownload } from "react-icons/fi";
import { BsShuffle } from "react-icons/bs";
import { Palette } from "../components/Cards/Palette/Palette";
import { Canvas } from "../components";
import { getImageData } from "../Utils/getImage";
import { saveAs } from "file-saver";

const HomePage = () => {
  const [imageData, setImageData] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1612808375766-b63ce23ae7f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  );
  const [flag, setFlag] = useState(false);
  const [showRandomImage, setShowRandomImage] = useState(false);
  const [color, setColor] = useState("");

  const colorArray = new Array(5);

  const imageApi = "https://api.unsplash.com/search/photos?query=";
  const completeImageAPI = `${imageApi}+landscape&client_id=${process.env.NEXT_PUBLIC_API_KEY}`;

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
    setShowRandomImage((pre) => !pre);
    getImageData(completeImageAPI, setImageUrl);
    setImageData([]);
  };

  const downloadHandler = () => {
    if (flag) {
      saveAs(imageData[imageData.length - 1].data_url, "palette.jpg");
    } else {
      saveAs(imageUrl, "palette.jpg");
    }
  };

  const mouseMoveHandler = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getImageData(completeImageAPI, setImageUrl);
  }, []);

  return (
    <Container minH="100vh" maxW="full" p={0} paddingBottom="10">
      <Flex
        h="95vh"
        w="full"
        py={10}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <VStack
          w="container.sm"
          minW="96"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Heading size="2xl">Get Colors from your Photos</Heading>
          <Text>
            Need a color palette that perfectly matches your favorite images?
            With Dopely image color palette generator, you can create color
            schemes in seconds. Simply upload a photo, and we’ll use the hues in
            the photo to create your palette.
          </Text>
          <ImageUploading
            multiple
            value={imageData}
            onChange={imageUploadHandler}
            maxNumber="1"
            dataURLKey="data_url"
          >
            {({ onImageUpdate }) => (
              <Button
                colorScheme="blue.400"
                bg="blue.400"
                borderRadius="full"
                size="lg"
                p={7}
                onClick={onImageUpdate}
              >
                Upload Image
              </Button>
            )}
          </ImageUploading>
        </VStack>
        <Flex w="container.sm" justifyContent="center">
          <VStack
            h="full"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              objectFit="contain"
              marginBottom={2}
              w="container"
              position="relative"
            >
              <Canvas
                setColor={setColor}
                imageData={imageData}
                imageUrl={imageUrl}
                flag={flag}
                showRandomImage={showRandomImage}
              />
            </Box>
            <Palette color={color} />
          </VStack>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            paddingLeft={5}
            py={5}
          >
            <IconButton
              aria-label="Call Segun"
              color="blue.400"
              fontSize="3xl"
              bg="transparent"
              p={6}
              borderRadius="full"
              icon={<BsShuffle />}
              onClick={randomImageHandler}
            />
            <IconButton
              aria-label="Call Segun"
              color="blue.400"
              fontSize="3xl"
              bg="transparent"
              p={6}
              borderRadius="full"
              icon={<FiDownload />}
              onClick={downloadHandler}
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default HomePage;
