import { Booking } from "@/generated/prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { BookingGetPayload } from "@/generated/prisma/models";
import { format, isFuture } from "date-fns";
import { locales } from "zod";
import { ptBR } from "date-fns/locale";

interface IBookingItemProps {
    booking: BookingGetPayload<{
        include: {
            service: {
                include: {
                    barbershop: true
                }
            }}
    }>;
};

const BookingItem = ({booking}: IBookingItemProps) => {
    const isConfirmed = isFuture(booking.date);

    // ChatGPT para retornar mês com primeira letra maiúscula
    function capitalize(text: string) {
       return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <>
            {/* <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Agendamentos</h2> */}

            <Card className="p-0 min-w-[70%]">
                <CardContent className="flex justify-between p-0">
                    {/* ESQUERDA */}
                    <div className="flex flex-col gap-2 py-5 pl-5">
                        {/* <Badge className="w-fit bg-[#8162FF] text-white"> */}
                        {/* <Badge variant="default"> */}
                        <Badge variant={isConfirmed ? "default" : "secondary"}>
                            {/* <p className="translate-y-px font-bold">Falta confirmar</p> */}
                            <p className="font-bold">{isConfirmed ? 'Falta Confirmar' : 'Finalizado'}</p>
                        </Badge>
                        {/* {booking.service.name} */}
                        <h3 className="font-semibold">{booking.service.name}</h3>

                        <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                                {/* <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" /> */}
                                <AvatarImage src={booking.service.barbershop.imageUrl} />
                            </Avatar>

                            {/* <p className="text-sm">AP Barbearia Premium</p> */}
                            <p className="text-sm">{booking.service.barbershop.name}</p>
                        </div>
                    </div>

                    {/* DIREITA */}
                    <div className="flex flex-col items-center justify-center px-5 border-l-2">
                        {/* <p className="text-sm font-bold">Fevereiro</p> */}
                        {/* <p className="text-sm font-bold">{format(booking.date, "MMMM", {locale: ptBR})}</p> */}
                        <p className="text-sm font-bold">{capitalize(format(booking.date, "MMMM", {locale: ptBR}))}</p>
                        {/* <p className="text-2xl font-bold">13</p> */}
                        <p className="text-2xl font-bold">{format(booking.date, "dd", {locale: ptBR})}</p>
                        {/* <p className="text-sm font-semibold">09:30</p> */}
                        <p className="text-sm font-semibold">{format(booking.date, "HH:mm", {locale: ptBR})}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default BookingItem;