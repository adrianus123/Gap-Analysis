import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import moment from "moment";

const LineChart = ({ data }) => {
  LineChart.propTypes = {
    data: PropTypes.array.isRequired,
  };

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (data) {
      setSeries([
        {
          name: "Locomotive Active",
          data: data.map((dt) => dt.totalLocoActive),
        },
        {
          name: "Locomotive Inactive",
          data: data.map((dt) => dt.totalLocoInActive),
        },
      ]);

      setOptions({
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Average Active & Inactive Locomotive",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: data.map((dt) =>
            moment(dt.timestamps).format("dddd, D/MM/YYYY HH:mm:ss")
          ),
          title: {
            text: "Time",
          },
        },
        yaxis: {
          title: {
            text: "Locomotive",
          },
          min: 0,
          max: data[0]?.totalLoco,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      });
    }
  }, [data]);

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
