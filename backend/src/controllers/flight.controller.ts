import flightsData from "../data/flights.json";
import SelectedFlight from "../models/SelectedFlight";

export const selectFlight = async (req: any, res: any) => {
  const { searchId, flightKey, fareId } = req.body;


let selected:any=[]
  if(flightKey.includes(","))
  {

    for(const ele of flightKey.split(","))
    {
      
      selected=[...selected,ele]
    }
  }
  else
  {
     selected = flightKey
  }

  const sectors = flightsData.data.result.sectors;
 
let flight:any=[]
  Object.values(sectors).forEach((sector: any) => {

 if(Array.isArray(selected))
  {
    for(const ele of selected)
    {
      
      if (sector[ele])
      flight=[...flight,sector[ele]]
    }
  }
  else
  {
    
     if (sector[selected]) flight = sector[selected];
  }

    
  });


  const saved = await SelectedFlight.create({
    searchId,
    flightKey,
    fareId,
    fullFlightJson: flight,
    
  });

  res.json(saved);
};
