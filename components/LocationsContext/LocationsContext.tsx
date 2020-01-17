import React from 'react';

export const LocationsContext = React.createContext({
  selectedLocations: [],
  removeSelectedLocation: (location: string) => location,
  setSelectedLocations: (results: Array<any>) => results
});

