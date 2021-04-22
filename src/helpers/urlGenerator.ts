export function urlGenerator(filters: {
    monetization?: Array<string>,
    priceRange?: Array<number>,
    niches?: string,
    page: number
    limit?: number
}){
  const urlString = 'https://api.empireflippers.com/api/v1/listings/list?&listing_status=For%20Sale'

  var urlParams = new URL(urlString);

  if(filters.page) {
    urlParams.searchParams.append(
      'page',
      String(filters.page)
    )
  }
  if(filters.limit) {
    urlParams.searchParams.append(
      'limit',
      String(filters.limit)
    )
  }
  
  if(filters.monetization) {
    urlParams.searchParams.append('monetization', filters.monetization.join('||'))
  }

  if(filters.priceRange) {
    urlParams.searchParams.append(
        'listing_price_from',
        String(filters.priceRange[0])
    )
    urlParams.searchParams.append(
        'listing_price_to',
        String(filters.priceRange[1])
    )
  }

  if(filters.niches) {
    urlParams.searchParams.append(
      'niches',
      filters.niches
    )
  }

  return urlParams.href
}