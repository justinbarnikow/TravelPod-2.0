import React from "react";

const AppContext = React.createContext({
getVehicle: () => {},
getStartingLocation: () => {},
getEndingLocation: () => {},
getDistance: () => {},
getPodcasts: () => {},
startingLocation: {},
endingLocation: {},
podcast: {},
travel: {}

})

export default AppContext