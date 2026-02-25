import flightsData from "../data/flights.json";
import Search from "../models/Search";

export const createSearch = async (req: any, res: any) => {
  const searchId = flightsData.data.searchId;

  await Search.create({
    searchId,
    query: req.body
  });


  res.json(flightsData);
};
