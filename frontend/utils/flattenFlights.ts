export const flattenFlights = (response: any) => {
  const data = response?.data || response;
  if (!data?.result) return [];

  const journeys = data.result.journeys || {};
  const sectors = data.result.sectors || {};
  const airlineMeta = data.result.metaData?.airlineDetail || {};
  const airportMeta = data.result.metaData?.airportDetail || {};

  const results: any[] = [];

  Object.entries(journeys).forEach(([journeyKey, journey]: any) => {
    const sectorKey = journey?.sector; 
    const sectorFlights = sectors?.[sectorKey];
    if (!sectorFlights) return;

    
    const sourceCode = sectorKey.slice(0, 3);
    const destinationCode = sectorKey.slice(3, 6);
    const journeyDate = sectorKey.slice(6); 

    Object.entries(sectorFlights).forEach(
      ([flightKey, flightObj]: any) => {
        const segments = flightObj?.flights || [];
        if (!segments.length) return;

        const firstSegment = segments[0];
        const lastSegment = segments[segments.length - 1];

        const airlineCode =
          flightObj?.otherDetails?.airline?.[0];

        const airlineName =
          airlineMeta?.[airlineCode]?.name ||
          airlineCode ||
          "Unknown Airline";

        const lowestFare = (flightObj?.fares || []).reduce(
          (min: any, fare: any) => {
            if (!min) return fare;
            return Number(fare?.price?.pricePerAdult) <
              Number(min?.price?.pricePerAdult)
              ? fare
              : min;
          },
          null
        );

        if (!lowestFare) return;

        const totalDuration = segments.reduce(
          (sum: number, seg: any) =>
            sum + (seg?.durationInMin || 0),
          0
        );

        results.push({
          journeyType:
            journeyKey === "J1" ? "ONWARD" : "RETURN",

          flightKey,
          searchId: data.searchId,

          sourceCode,
          destinationCode,
          journeyDate,

          airline: airlineName,
          airlineCode,

          flightNumber: firstSegment?.fltNo,

          departureAirport:
            airportMeta?.[sourceCode]?.city ||
            sourceCode,

          arrivalAirport:
            airportMeta?.[destinationCode]?.city ||
            destinationCode,

          departureTime:
            firstSegment?.departureAirport?.time,

          arrivalTime:
            lastSegment?.arrivalAirport?.time,

          durationInMin: totalDuration,

          stops:
            flightObj?.otherDetails?.totalStops ?? 0,

          price: Number(
            lowestFare?.price?.pricePerAdult
          ),

          fareId: lowestFare?.fareId,
          refundable: lowestFare?.refundable,
          fullFlight: flightObj,
        });
      }
    );
  });

  return results;
};