import { Box, Flex, Icon } from "@chakra-ui/react";
import logo from "../../../images/logo.svg";
import { FaGithub, FaTwitter, FaGlobeAsia } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
      px={5}
    >
      <Image src={logo} alt="logo" width={220} height={40} />
      <Box>
        <Link href="https://saurabhchirde.com/">
          <Icon as={FaGlobeAsia} w={25} h={25} m={3} />
        </Link>
        <Link href="https://github.com/saurabhchirde">
          <Icon as={FaGithub} w={25} h={25} m={3} />
        </Link>
        <Link href="https://twitter.com/SaurabhChirde">
          <Icon as={FaTwitter} w={25} h={25} m={3} />
        </Link>
      </Box>
    </Flex>
  );
};
