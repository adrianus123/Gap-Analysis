import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      padding={2}
      bgColor="#FFFFFF"
      boxShadow="0px 0px 5px 0px rgba(0,0,0,0.3)"
      borderRadius={4}
    >
      <Text fontSize="2xl" fontWeight={500}>
        Dashboard
      </Text>
    </Box>
  );
};

export default Header;
