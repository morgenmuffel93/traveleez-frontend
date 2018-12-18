import React from 'react';

const myContext = React.createContext();

export const LocationsProvider = myContext.Provider;
export const LocationsConsumer = myContext.Consumer;