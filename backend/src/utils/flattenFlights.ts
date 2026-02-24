export const flattenFlights = (data: any) => {
  const sectors = data.result.sectors;
  const result: any[] = [];

  Object.keys(sectors).forEach((sectorKey) => {
    const sectorFlights = sectors[sectorKey];

    Object.keys(sectorFlights).forEach((flightKey) => {
      const flight = sectorFlights[flightKey];

      result.push({
        flightKey,
        ...flight
      });
    });
  });

  return result;
};
