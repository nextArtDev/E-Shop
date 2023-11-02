'use server'

import { getPaymentDriver } from 'monopay'

const driver = getPaymentDriver('zibal', {
  merchantId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  sandbox: true,
})

export async function getPayment(params?: any) {
  try {
    console.log('123')
    const paymentInfo = await driver.requestPayment({
      amount: 50000,
      callbackUrl: 'http://localhost:3000/cart',
      description: 'Description about the transaction',
    })
    console.log('paymentInfo', paymentInfo.url)
    return paymentInfo
  } catch (error) {
    // console.log(error)
    throw error
  }
}

export async function verifyPayment(params?: any) {
  try {
    const { url, amount, refereceId } = params
    const res = await fetch(url)
    console.log('verify', res)
    return res.body
  } catch (error) {
    // console.log(error)
    throw error
  }
}
// const getZibal = async (query: Query) => {
//   const url = qs.stringifyUrl({
//     url: URL,
//     query: {
//       amount: query.amount,
//       referenceId: query.referenceId,
//     },
//   })

//   const res = await fetch(url)

//   console.log(res)
//   return res.body
