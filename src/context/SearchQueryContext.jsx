import React, { createContext, useContext, useState } from 'react';

const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
    const [isFetching, setIsFetching] = useState(false);

    return (
        <FetchContext.Provider value={{ isFetching, setIsFetching }}>
            {children}
        </FetchContext.Provider>
    );
};

export const useFetch = () => useContext(FetchContext);
