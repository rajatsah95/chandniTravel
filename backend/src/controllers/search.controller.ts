import flightsData from "../data/flights.json";
import { flattenFlights } from "../utils/flattenFlights";
import Search from "../models/Search";

export const createSearch = async (req: any, res: any) => {
  const searchId = flightsData.data.searchId;

  await Search.create({
    searchId,
    query: req.body
  });

  // const flights = flattenFlights(flightsData.data);

  // res.json({ searchId, flights });
  res.json(flightsData);
};
