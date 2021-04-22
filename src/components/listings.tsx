import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useGlobalContext } from '../providers/stateProvider' 
import { convertNumberToPrice } from '../helpers/converters'

export default function Listings(){
    const globalState = useGlobalContext()
  const listings = globalState.state.listings as Array<any>
    
  return (
    <TableContainer component={Paper}>
      <Table aria-label="listings table">
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
            <TableRow>
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
  )
}
