import { useGlobalContext } from '../providers/stateProvider' 


export default function Listings(){
    const globalState = useGlobalContext()
  const { state } = globalState;
    
  console.log('listings', state)
    return (
        <div>
            Listings
        </div>
    )
}
