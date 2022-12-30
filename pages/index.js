import { Container, Divider, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { CanvasWithPalette, Header, UploadSection } from "../components";
import { usePebble } from "../context/PebbleContext";
import { getImageData } from "../Utils/getImage";

const HomePage = () => {
  const { setUploadedImages, setImageUrl, setFlag } = usePebble();
  const isMobileView = useBreakpointValue({ base: true, md: false });

  const imageApi = "https://api.unsplash.com/search/photos?query=";
  const completeImageAPI = `${imageApi}+landscape&client_id=${process.env.NEXT_PUBLIC_API_KEY}`;

  // To upload image
  const imageUploadHandler = (newImage) => {
    setUploadedImages(newImage);
    setImageUrl("");
    if (newImage.length > 0) {
      setFlag(true);
    }
  };

  // To randomize image
  const randomImageHandler = () => {
    setFlag(false);
    getImageData(completeImageAPI, setImageUrl);
    setUploadedImages([]);
  };

  useEffect(() => {
    getImageData(completeImageAPI, setImageUrl);
  }, [completeImageAPI]);

  return (
    <Container
      maxW="full"
      minH="100vh"
      backgroundColor="blue.50"
      px={isMobileView ? 2 : 4}
    >
      <Container
        maxW={isMobileView ? "container.md" : "container.xl"}
        p={0}
        paddingBottom="10"
      >
        <Header />
        <Flex
          py={0}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          w="full"
          direction={isMobileView ? "column" : "row"}
          mt={isMobileView ? 4 : 0}
        >
          <UploadSection imageUploadHandler={imageUploadHandler} />
          {isMobileView && <Divider my="0.5rem" />}
          <CanvasWithPalette randomImageHandler={randomImageHandler} />
        </Flex>
      </Container>
    </Container>
  );
};

export default HomePage;
