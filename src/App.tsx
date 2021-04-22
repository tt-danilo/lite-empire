import React, { useEffect }  from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './components/header'
import Filters from './components/filters'
import Listings from './components/listings'
import { useGlobalContext } from './providers/stateProvider' 

function App() {
  const globalState = useGlobalContext()
  const { dispatch, state } = globalState;

  const isLoading = state.isLoading
  
  useEffect(() => {
    async function fetchData() {
      await dispatch({
        type: 'Set__Loading',
      })
      
      return await fetch('https://api.empireflippers.com/api/v1/listings/list?page=1&listing_status=For%20Sale')
      .then(response => response.json())
      .then(({data}) => {
        dispatch({
          type: 'Set__Listings',
          data: {
            listings: data?.listings
          }
        })

        dispatch({
          type: 'Set__Loading',
        })
      })
    }
    
    fetchData()
  }, [dispatch])

  return (
      <div className="App">
        <Header />
        <Filters />
        {isLoading ?
          <CircularProgress
            variant="determinate"
            size={40}
            thickness={4}
            value={100}
          />
        : <Listings />}
      </div>
  );
}

export default App;
