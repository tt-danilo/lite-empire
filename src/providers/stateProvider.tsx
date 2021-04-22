import React, { useReducer, createContext, useContext }  from 'react';

const initialState = {
  state: {},
  dispatch: () => {}
};
  
  const storeContext = createContext<GlobalContext>(initialState);
  const { Provider } = storeContext;

  const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer((state: any, action: any) => {
      switch(action.type) {
        case 'Set__Listings':
          console.log('test1', action.data)
          state = action.data
          return action.data
        default:
          throw new Error();
      };
    }, initialState);
  
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };

  export { storeContext, StateProvider }
  export const useGlobalContext = () => useContext<GlobalContext>(storeContext)

