import { Router } from "express";
import { createBooking, getAllBookings } from "../controllers/booking.controller";

const router = Router();
router.post("/", createBooking);
router.get("/", getAllBookings);

export default router;
