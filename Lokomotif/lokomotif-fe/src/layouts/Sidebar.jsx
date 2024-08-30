import {
  Center,
  Divider,
  Flex,
  Icon,
  List,
  ListItem,
  ListIcon,
  Text,
} from "@chakra-ui/react";
import { MdSpaceDashboard, MdLocalActivity } from "react-icons/md";
import { GiSteamLocomotive } from "react-icons/gi";
import { useState } from "react";

const Sidebar = () => {
  const [sidebarList, setSidebarList] = useState([
    { label: "Dashboard", icon: MdSpaceDashboard, isActive: true },
    { label: "Activity", icon: MdLocalActivity, isActive: false },
  ]);

  const toggleSidebar = (itemIndex) => {
    const updatedItem = sidebarList?.map((item, index) => {
      if (index === itemIndex) {
        return {
          ...item,
          isActive: true,
        };
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });

    setSidebarList(updatedItem);
  };

  return (
    <Flex
      flexDirection="column"
      gap={4}
      bgColor={"#525FE1"}
      boxShadow="0px 0px 5px 0px rgba(0,0,0,0.3)"
      borderRadius={4}
      height="full"
      padding={4}
    >
      <Flex gap={4}>
        <Center>
          <Icon boxSize={10} as={GiSteamLocomotive} color="#FFF6F4" />
        </Center>
        <Center>
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            color="#FFF6F4"
          >
            Locomotive
          </Text>
        </Center>
      </Flex>
      <Divider orientation="horizontal" />
      <List spacing={2}>
        {sidebarList?.map((item, index) => (
          <ListItem key={item.label}>
            <Flex
              alignItems="center"
              backgroundColor={item.isActive && "#FFA41B"}
              padding={2}
              borderRadius={4}
              onClick={() => toggleSidebar(index)}
              _hover={{
                backgroundColor: "#FFA41B",
                cursor: "pointer",
                transition: "0.2s ease",
              }}
            >
              <ListIcon as={item.icon} boxSize={6} color="#FFF6F4" />
              <Text fontSize="md" color="#FFF6F4">
                {item.label}
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default Sidebar;
