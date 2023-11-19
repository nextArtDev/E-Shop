import { prisma } from '@/lib/prisma'
import moment from 'moment'

export default async function getGraphData() {
  try {
    // Get the start and and end dates for the data range (7 days ago to today)
    const startData = moment().subtract(6, 'days').startOf('day')
    const endDate = moment().endOf('day')

    //Query the database to get order data grouped by createdDate
    const result = await prisma.order.groupBy({
      by: ['created_at'],
      where: {
        created_at: {
          gte: startData.toISOString(),
          lte: endDate.toISOString(),
        },
        status: true,
      },
      _sum: {
        amount: true,
      },
    })

    // initialize an object to aggregate the data by day

    const aggregateData: {
      [day: string]: { day: string; date: string; totalAmount: number }
    } = {}

    //create a clone of the start date to iterate over each day
    const currentDate = startData.clone()

    // iterate over Each day in the date range
    while (currentDate <= endDate) {
      //format the day as a string (e.g. "Monday")
      const day = currentDate.format('dddd')
      //   console.log('day<<<', day, currentDate)

      // Initialize the aggregated data for the day with the day, date and totalAmount
      aggregateData[day] = {
        day,
        date: currentDate.format('YYYY-MM_DD'),
        totalAmount: 0,
      }

      // Move to the next day
      currentDate.add(1, 'day')
    }
    //Calculate the total amount for each day by summing the other amount
    result.forEach((entry) => {
      const day = moment(entry.created_at).format('dddd')
      const amount = entry._sum.amount || 0
      aggregateData[day].totalAmount += amount
    })

    // Convert the aggregatedDate object to an array sort it by date

    const formattedData = Object.values(aggregateData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    )

    return formattedData
  } catch (error) {}
}
