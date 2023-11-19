'use client'
import { FC } from 'react'

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

interface GraphData {
  day: string
  date: string
  totalAmount: number
}
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

interface BarGraphProps {
  data: GraphData[]
}
const BarGraph: FC<BarGraphProps> = ({ data }) => {
  const labels = data.map((item) => item.day)
  const amounts = data.map((item) => item.totalAmount)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'میزان فروش',
        data: amounts,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }
  return <Bar data={chartData} options={options}></Bar>
}

export default BarGraph
