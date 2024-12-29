import React, { createContext, useState, useContext } from 'react';

const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
    const [clickCount, setClickCount] = useState(0);

    const incrementClick = () => setClickCount((prev) => prev + 1);

    return (
        <ClickContext.Provider value={{ clickCount, incrementClick }}>
            {children}
        </ClickContext.Provider>
    );
};

export const useClick = () => useContext(ClickContext);
