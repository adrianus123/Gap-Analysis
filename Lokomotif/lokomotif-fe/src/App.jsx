import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import MainLayout from "./layouts/MainLayout";
import Footer from "./layouts/Footer";

const App = () => {
  return (
    <Grid
      templateAreas={`"nav header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={"1fr"}
      gridTemplateColumns={"1fr"}
      minH="100vh"
      gap={3}
      padding={3}
      bgColor="#FFF6F4"
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem area={"main"}>
        <MainLayout />{" "}
      </GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default App;
