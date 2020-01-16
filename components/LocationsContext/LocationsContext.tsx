import React from 'react';

export const LocationsContext = React.createContext({
  searchTerm: "",
  searchResults: [],
  selectedLocations: [],
  setSearchTerm: () => null,
  removeSelectedLocation: (location: string) => location,
  getLocationsKeyUpEvent: (event: any) => event
});

