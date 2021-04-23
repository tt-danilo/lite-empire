import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { useGlobalContext } from '../providers/stateProvider' 
import { convertNumberToPrice } from '../helpers/converters'
import { urlGenerator } from '../helpers/urlGenerator'

export default function Listings(){
    const globalState = useGlobalContext()
  const { dispatch, state } = globalState;
  const listings = state.listings as Array<any>
  const {
    monetization,
    priceRange,
    niches,
    currentPage,
  } = state
  const rowsPerPage = state.limit
  const totalPages = state.count

  function fetchFilteredData(url: string, pageData?: any){
    fetch(url)
      .then(response => response.json())
      .then(({data}) => {
        dispatch({
          type: 'Set__Listings',
          data: {
            ...pageData,
            listings: data?.listings,
          }
        })

        dispatch({
          type: 'Set__Loading',
        })
      })
  }
  
  const handleChangePage = (event: any, page: number) => {
    console.log('handle', page)
    dispatch({
      type: 'Set__Loading',
    })

    const url = urlGenerator({
      monetization,
      priceRange,
      niches,
      page: page + 1,
      limit: state.limit
    })

    fetchFilteredData(url, {
      currentPage: page + 1
    })
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'Set__Loading',
    })
    
    const newLimit = parseInt(event.target.value, 10)
    const url = urlGenerator({
      monetization,
      priceRange,
      niches,
      page: 1,
      limit: newLimit
    })

    fetchFilteredData(url, {
      limit: newLimit,
      currentPage: 1,
    })
  };
  
  return (
    <Paper>
      <TableContainer>
        <Table aria-label="listings table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Listing</TableCell>
              <TableCell align="center">Niche & Status</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Monthly Net Profit</TableCell>
              <TableCell align="center">Reason For Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(listings || []).map(listing => {
            const niches = listing.niches.map((v: any) => v.niche).join(', ')
            return (
              <TableRow key={listing.id}>
                <TableCell align="center">{listing.listing_number}</TableCell>
                <TableCell align="center">{niches}</TableCell>
                <TableCell align="center">{convertNumberToPrice(listing.listing_price)}</TableCell>
                <TableCell align="center">{convertNumberToPrice(listing.average_monthly_net_profit)}</TableCell>
                <TableCell align="center">{listing.reason_for_sale}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          component="div"
        count={totalPages || 0}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[20,50,100]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
