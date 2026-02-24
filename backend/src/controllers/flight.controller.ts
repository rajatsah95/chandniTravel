import flightsData from "../data/flights.json";
import SelectedFlight from "../models/SelectedFlight";

export const selectFlight = async (req: any, res: any) => {
  const { searchId, flightKey, fareId } = req.body;

  const sectors = flightsData.data.result.sectors;
  let selected: any;

  Object.values(sectors).forEach((sector: any) => {
    if (sector[flightKey]) selected = sector[flightKey];
  });

  const fare = selected.fares.find((f: any) => f.fareId === fareId);

  const saved = await SelectedFlight.create({
    searchId,
    flightKey,
    fareId,
    fullFlightJson: selected,
    selectedFare: fare
  });

  res.json(saved);
};
