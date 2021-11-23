import { createContext, useContext } from 'react';

const PropsContext = createContext<any>({});

function usePropsContext<T>() {
  return useContext<T>(PropsContext);
}

function PropsContextProvider({ children, props }) {
  return <PropsContext.Provider value={props}>{children}</PropsContext.Provider>;
}

export { usePropsContext, PropsContextProvider };
