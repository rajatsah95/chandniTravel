import express from "express";
import cors from "cors";
import searchRoutes from "./routes/search.routes";
import flightRoutes from "./routes/flight.routes";
import bookingRoutes from "./routes/booking.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/",async (req: any, res: any)=>{
     res.json({
    message: "chandni travel backend is running"
  });
})
app.use("/api/search", searchRoutes);
app.use("/api/flight", flightRoutes);
app.use("/api/booking", bookingRoutes);

export default app;
