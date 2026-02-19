"use server"

import { db } from "../_lib/prisma"

interface ICreateBookingParams {
    userId: string,
    serviceId: string,
    date: Date
}

export const createBooking = async (params: ICreateBookingParams) => {
    await db.booking.create({
        data: params
    })

    // revalidar o cache da página para atualizar tela de agendamento
}