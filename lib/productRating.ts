const productRating = (data: any) => {
  data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length
}
