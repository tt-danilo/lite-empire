import React, { useEffect }  from 'react';
import Header from './components/header'
import Filters from './components/filters'
import Listings from './components/listings'
import { useGlobalContext } from './providers/stateProvider' 

function App() {
  const globalState = useGlobalContext()
  const { dispatch } = globalState;
  
  useEffect(() => {
    async function fetchData() {
      return await fetch('https://api.empireflippers.com/api/v1/listings/list?page=1&listing_status=For%20Sale')
      .then(response => response.json())
      .then(({data}) => {
        dispatch({
          type: 'Set__Listings',
          data: data?.listings
        })
      })
    }
    
    fetchData()
  }, [dispatch])

  return (
      <div className="App">
        <Header />
        <Filters />
        <Listings />
      </div>
  );
}

export default App;
