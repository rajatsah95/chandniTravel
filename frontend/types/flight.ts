export interface Flight {
  id: string;
  airline: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
}