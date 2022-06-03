import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import ImageUploading from "react-images-uploading";

export const UploadSection = ({ imageData, imageUploadHandler }) => {
  return (
    <VStack
      w="container.sm"
      h="container.md"
      p={5}
      alignItems="flex-start"
      justifyContent="center"
    >
      <Box marginBottom={28}>
        <Heading size="2xl" marginBottom={10}>
          Extract Colors from your Photos
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
  );
};
