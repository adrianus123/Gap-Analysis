import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import CardComp from "../components/CardComp";
import LineChart from "../components/LineChart";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../components/TableComponent";
import { getLocomotives, getSummary, getTop10Summary } from "../api/api";
import moment from "moment/moment";

const MainLayout = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [locomotiveData, setLocomotiveData] = useState([]);
  const [top10Data, setTop10Data] = useState([]);
  const cardData = [
    {
      title: "Total Locomotive",
      value: summaryData[0]?.totalLocomotive || 0,
      bgcolor: "blue.300",
      circularColor: "blue.700",
    },
    {
      title: "Total Locomotive Active",
      value: summaryData[0]?.totalActive || 0,
      bgcolor: "green.300",
      circularColor: "green.700",
    },
    {
      title: "Total Locomotive Not Active",
      value: summaryData[0]?.totalInactive || 0,
      bgcolor: "red.300",
      circularColor: "red.700",
    },
  ];

  useEffect(() => {
    getLocomotiveData();
    getSummaryData();
    getTop10SummaryData();

    const intervalLoco = setInterval(() => {
      getLocomotiveData();
    }, 10000);

    const intervalSummary = setInterval(() => {
      getSummaryData();
      getTop10SummaryData();
    }, 3600000);

    return () => {
      clearInterval(intervalLoco);
      clearInterval(intervalSummary);
    };
  }, []);

  const getSummaryData = async () => {
    try {
      const response = await getSummary();

      const arrTemp = [];
      response.data?.map((data) => {
        const arrItem = {
          date: moment(data.timestamps).format("dddd, DD MMMM YYYY, h:mm:ss"),
          totalLocomotive: data.totalLoco,
          totalActive: data.totalLocoActive,
          totalInactive: data.totalLocoInActive,
        };

        arrTemp.push(arrItem);
      });

      setSummaryData(arrTemp);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocomotiveData = async () => {
    try {
      const response = await getLocomotives();
      setLocomotiveData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTop10SummaryData = async () => {
    try {
      const response = await getTop10Summary();
      setTop10Data(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const summaryColumns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Total Locomotive",
        accessor: "totalLocomotive",
      },
      {
        Header: "Total Active",
        accessor: "totalActive",
      },
      {
        Header: "Total Inactive",
        accessor: "totalInactive",
      },
    ],
    []
  );

  const locoColumns = useMemo(
    () => [
      {
        Header: "Loco Code",
        accessor: "locoCode",
      },
      {
        Header: "Loco Name",
        accessor: "locoName",
      },
      {
        Header: "Loco Length",
        accessor: "locoLength",
      },
      {
        Header: "Loco Width",
        accessor: "locoWidth",
      },
      {
        Header: "Loco Height",
        accessor: "locoHeight",
      },
      {
        Header: "Loco Weight",
        accessor: "locoWeight",
      },
      {
        Header: "Loco Status",
        accessor: "locoStatus",
      },
    ],
    []
  );

  return (
    <Flex flexDirection="column" gap={3}>
      <SimpleGrid columns={3} gap={3}>
        {cardData?.map((data) => (
          <CardComp
            key={data.title}
            bgcolor={data.bgcolor}
            title={data.title}
            value={data.value}
            circularColor={data.circularColor}
          />
        ))}
      </SimpleGrid>
      <Box
        bgColor="#FFFFFF"
        boxShadow="0px 0px 5px 0px rgba(0,0,0,0.3)"
        padding={2}
        borderRadius={4}
      >
        <Text fontSize="xl" align="center" fontWeight={300} mb={2}>
          Summary Chart
        </Text>
        <LineChart data={top10Data} />
      </Box>
      <Box
        bgColor="#FFFFFF"
        boxShadow="0px 0px 5px 0px rgba(0,0,0,0.3)"
        padding={2}
        borderRadius={4}
      >
        <Text fontSize="xl" align="center" fontWeight={300} mb={2}>
          Summary Table
        </Text>
        <TableComponent columns={summaryColumns} data={summaryData} />
      </Box>
      <Box
        bgColor="#FFFFFF"
        boxShadow="0px 0px 5px 0px rgba(0,0,0,0.3)"
        padding={2}
        borderRadius={4}
      >
        <Text fontSize="xl" align="center" fontWeight={300} mb={2}>
          Locomotive List
        </Text>
        <TableComponent columns={locoColumns} data={locomotiveData} />
      </Box>
    </Flex>
  );
};

export default MainLayout;
