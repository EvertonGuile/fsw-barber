"use server"

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface IGetBookingsProps {
    serviceId: string;
    date: Date
};

export const getBookings = async ({date}: IGetBookingsProps) => {
    return db.booking.findMany({
        where: {
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            }
        }
    })
}