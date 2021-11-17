const query = async (req) => {
  const $select = JSON.parse(req?.query?.$select || '""')
  const $filter = JSON.parse(req?.query?.$filter || '{}')
  const $populate = JSON.parse(req?.query?.$populate || '""')
  const $sort = JSON.parse(req?.query?.$sort || '""')
  const pagination = JSON.parse(req?.query?.$pagination || '{}')

  // Pagination
  const options = [25, 50, 100]

  const currentIndex = Number(pagination.currentIndex) || 1
  let itemsPerPage = Number(pagination.itemsPerPage) || options[0]

  if (itemsPerPage > 500) {
    itemsPerPage = 500
  }

  const $pagination = {
    currentIndex,
    itemsPerPage,
    options
  }

  return { $filter, $sort, $select, $populate, $pagination }
}

export default query
