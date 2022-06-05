import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { PebbleProvider } from "../context/PebbleContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <PebbleProvider>
        <Component {...pageProps} />
      </PebbleProvider>
    </ChakraProvider>
  );
}

export default MyApp;
