import { Center, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Center
      bgColor="#FFFFFF"
      boxShadow="0px 0px 5px 0px rgba(0,0,0,0.3)"
      padding={2}
      borderRadius={4}
    >
      <Text fontSize="xs">&copy; Locomotive 2023</Text>
    </Center>
  );
};

export default Footer;
