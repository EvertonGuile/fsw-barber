"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { error } from "console"
import { authOptions } from "../_lib/auth"

interface ICreateBookingParams {
    // userId: string,
    serviceId: string,
    date: Date
}

export const createBooking = async (params: ICreateBookingParams) => {

    // garantir que se não estiver logado essa rota não será acessada
    const user = await getServerSession(authOptions);
    if (!user) {
        throw new Error("Usuário não autenticado! Por favor, faça login");
    };
    // 

    await db.booking.create({
        // data: params
        data: {...params, userId: (user.user as any).id}
    })

    // revalidar o cache da página para atualizar tela de agendamento
}