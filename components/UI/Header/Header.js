import { Flex, Icon } from "@chakra-ui/react";
import logo from "../../../images/logo.svg";
import { FiGithub, FiTwitter, FiGlobe } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <Flex
      w="full"
      h="20"
      zIndex={2}
      alignItems="center"
      justifyContent="space-between"
      px={5}
    >
      <Image src={logo} alt="logo" width={190} height={40} />
      <Flex alignItems="center">
        <Link href="https://saurabhchirde.com/">
          <Icon
            as={FiGlobe}
            w={22}
            h={22}
            m={3}
            color="blue.400"
            cursor="pointer"
          />
        </Link>
        <Link href="https://github.com/saurabhchirde">
          <Icon
            as={FiGithub}
            w={22}
            h={22}
            m={3}
            color="blue.400"
            cursor="pointer"
          />
        </Link>
        <Link href="https://twitter.com/SaurabhChirde">
          <Icon
            as={FiTwitter}
            w={22}
            h={22}
            m={3}
            color="blue.400"
            cursor="pointer"
          />
        </Link>
      </Flex>
    </Flex>
  );
};
