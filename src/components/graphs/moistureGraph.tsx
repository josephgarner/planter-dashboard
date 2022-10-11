import { usePlantIDList } from "context/PlanterContextProvider";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  registerables,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useIrrigationHistory } from "websocket/useIrrigationHistory";
import { PlnaterMoisture } from "types";
import { createStyles, Paper } from "@mantine/core";
import { enAU } from "date-fns/locale";

ChartJS.register(...registerables, Filler);

export const IrrigationGraph = () => {
  const { classes } = useStyles();
  const { selectedPlanter } = usePlantIDList();
  const history = useIrrigationHistory(selectedPlanter!);

  const [data, setData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: "Irrigation",
        data: [],
        fill: true,
        backgroundColor: "rgba(46, 94, 170, 1)",
        borderColor: "rgba(46, 94, 170, 1)",
        // fillColor: "rgba(46, 94, 170, 1)",
        tension: 0.5,
      },
    ],
  });
  const handleIncomingValues = (incoming: PlnaterMoisture[]) => {
    return incoming.map((e) => {
      return e.moisturePercentage;
    });
  };
  const handleIncomingLabels = (incoming: PlnaterMoisture[]) => {
    return incoming.map((e) => {
      return e.dateReceived;
    });
  };

  useEffect(() => {
    if (history) {
      setData((prevData) => {
        return {
          labels: [...handleIncomingLabels(history)],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...handleIncomingValues(history)],
            },
          ],
        };
      });
    }
  }, [history]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
    scales: {
      y: {
        // color: "blue",
        min: 0,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          color: "#e9ebf0",
        },
      },
      x: {
        adapters: {
          date: {
            locale: enAU,
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#e9ebf0",
          maxTicksLimit: 10,
          maxRotation: 0,
          minRotation: 0,
        },
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <Paper radius="lg" p="md" withBorder className={classes.container}>
      <Line data={data} options={options} />
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "column",
    width: "100%",
    height: 400,
  },
}));
