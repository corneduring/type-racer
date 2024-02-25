import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Index from "./page";

const App = () => {
  return (
    <ChakraProvider>
      <Index />
    </ChakraProvider>
  );
};

export default App;
