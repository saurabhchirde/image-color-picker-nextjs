import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import ImageUploading from "react-images-uploading";

export const UploadSection = ({ uploadedImages, imageUploadHandler }) => {
  return (
    <VStack
      width={["100%", "100%", "100%", "40%"]}
      height={{
        base: "100%",
        md: "container",
        xl: "container.sm",
      }}
      p={5}
      alignItems="flex-start"
      justifyContent="center"
    >
      <Box marginBottom={16}>
        <Heading
          size="2xl"
          marginBottom={10}
          fontWeight="500"
          lineHeight="shorter"
        >
          Extract Colors From Your Favourite Photos
        </Heading>
        <Text>
          Need a color palette that perfectly matches your favorite images? With
          Dopely image color palette generator, you can create color schemes in
          seconds. Simply upload a photo, and we’ll use the hues in the photo to
          create your palette.
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
            size="lg"
            p={7}
            onClick={onImageUpdate}
          >
            Upload Image
          </Button>
        )}
      </ImageUploading>
    </VStack>
  );
};
