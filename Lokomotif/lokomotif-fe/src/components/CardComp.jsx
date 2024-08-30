import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
  Flex,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CardComp = ({ bgcolor, title, value, circularColor }) => {
  CardComp.propTypes = {
    bgcolor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    circularColor: PropTypes.string.isRequired,
  };

  return (
    <Card boxShadow="0px 0px 5px 0px rgba(0,0,0,0.3)" bgColor={bgcolor}>
      <Flex alignItems={"center"} justifyContent="space-between" height="100%">
        <Box>
          <CardHeader>
            <Text fontSize="lg" fontWeight={300} color="#FFF6F4">
              {title}
            </Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="2xl" fontWeight={600} color="#FFF6F4">
              {value.toLocaleString()}
            </Text>
          </CardBody>
        </Box>
        <CircularProgress
          value={50}
          size="100px"
          color={circularColor}
          capIsRound
          p={4}
        />
      </Flex>
    </Card>
  );
};

export default CardComp;
