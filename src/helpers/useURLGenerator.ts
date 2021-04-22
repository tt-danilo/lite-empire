export function useURLGenerator(filters: {
    monetization: Array<string>,
    priceRange: Array<number>
}){
    const urlString = 'https://api.empireflippers.com/api/v1/listings/list?page=1&listing_status=For%20Sale'

    var urlParams = new URL(urlString);

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
    
    return urlParams.href
}