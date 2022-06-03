import { Box, Flex, Icon } from "@chakra-ui/react";
import logo from "../../../images/logo.svg";
import { FaGithub, FaTwitter, FaGlobeAsia } from "react-icons/fa";

export const Header = () => {
  return (
    <Flex
      w="full"
      h={20}
      position="sticky"
      top={0}
      backgroundColor="white"
      boxShadow="base"
      zIndex={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <img
        src={logo}
        alt="logo"
        style={{ width: "220px", marginLeft: "20px" }}
      />
      <Box marginRight={5}>
        <a href="https://saurabhchirde.com/" target="_blank">
          <Icon as={FaGlobeAsia} w={25} h={25} m={3} />
        </a>
        <a href="https://github.com/saurabhchirde" target="_blank">
          <Icon as={FaGithub} w={25} h={25} m={3} />
        </a>
        <a href="https://twitter.com/SaurabhChirde" target="_blank">
          <Icon as={FaTwitter} w={25} h={25} m={3} />
        </a>
      </Box>
    </Flex>
  );
};
