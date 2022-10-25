import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import ImageUploading from "react-images-uploading";
import { usePebble } from "../../context/PebbleContext";

export const UploadSection = ({ imageUploadHandler }) => {
  const { uploadedImages } = usePebble();
  const isMobileView = useBreakpointValue({ base: true, md: false });

  return (
    <VStack
      width={["100%", "100%", "100%", "40%"]}
      height={{
        base: "100%",
        md: "container",
        xl: "container.sm",
      }}
      p={isMobileView ? 0 : 5}
      alignItems="flex-start"
      justifyContent="center"
      mb={isMobileView ? 4 : 0}
    >
      <Box marginBottom={isMobileView ? 2 : 16}>
        <Heading
          size={isMobileView ? "lg" : "2xl"}
          marginBottom={isMobileView ? 4 : 10}
          fontWeight="bold"
          lineHeight="shorter"
        >
          Pick/Extract Colors From Your Favourite Photos
        </Heading>
        <Text>
          Need a color palette that perfectly matches your favorite images? With
          Pebble Colors, you can create color schemes in seconds. Simply by
          upload a photo, you can create your own palettes.
        </Text>
      </Box>
      <ImageUploading
        multiple
        value={uploadedImages}
        onChange={imageUploadHandler}
        maxNumber="1"
        dataURLKey="data_url"
      >
        {({ onImageUpdate }) => (
          <Button
            colorScheme="blue.400"
            bg="blue.400"
            borderRadius="lg"
            size={isMobileView ? "md" : "lg"}
            p={isMobileView ? 4 : 7}
            onClick={onImageUpdate}
            w={isMobileView ? "full" : "auto"}
          >
            Upload Image
          </Button>
        )}
      </ImageUploading>
    </VStack>
  );
};
