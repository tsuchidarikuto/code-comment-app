import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { scores } from "./page";

// Chart.jsの要素を登録
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const renderRadarChart = (score: scores | undefined) => {
  if (!score) return null; // スコアがない場合は何も描画しない

  const data = {
    labels: ["基礎知識", "適切性", "明確性", "一貫性", "有用性"],
    datasets: [
      {
        label: "評価",
        data: [
          score.knowledge,
          score.appropriateness,
          score.clarity,
          score.consistency,
          score.usefulness,
        ],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10, // スコア範囲（0-10）
      },
    },
  };

  return <Radar data={data} options={options} />;
};
