import React, { useReducer, createContext, useContext }  from 'react';

const initialState = {
  state: {
    isLoading: false,
    currentPage: 1,
  },
  dispatch: () => {}
};
  
  const storeContext = createContext<GlobalContext>(initialState);
  const { Provider } = storeContext;

  const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer((state: any, action: any) => {
      switch(action.type) {
        case 'Set__Listings':
          return {
            ...state,
            ...action.data
          }
        case 'Set__Loading':
          return {
            ...state,
            isLoading: !state?.isLoading
          }
        default:
          throw new Error();
      };
    }, initialState);
  
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };

  export { storeContext, StateProvider }
  export const useGlobalContext = () => useContext<GlobalContext>(storeContext)

