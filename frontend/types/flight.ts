// export interface Flight {
//   id: string;
//   airline: string;
//   from: string;
//   to: string;
//   departureTime: string;
//   arrivalTime: string;
//   price: number;
// }

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