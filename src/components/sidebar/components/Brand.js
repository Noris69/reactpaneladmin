import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <img
        src="https://seeklogo.com/images/R/radio-mars-logo-47045B8CE5-seeklogo.com.png"
        alt="Radio Mars Logo"
      />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
