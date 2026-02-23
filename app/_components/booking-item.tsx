import { Booking } from "@/generated/prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { BookingGetPayload } from "@/generated/prisma/models";
import { format, isFuture } from "date-fns";
import { locales } from "zod";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
// import { Dialog, DialogTrigger } from "./ui/dialog";

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
    // destructuring para facilitar acessos dos dados
    const {service: {barbershop}} = booking;

    const isConfirmed = isFuture(booking.date);

    // ChatGPT para retornar mês com primeira letra maiúscula
    function capitalize(text: string) {
       return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <Sheet>
            <SheetTrigger className="w-full">
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
            </SheetTrigger>

            <SheetContent className="px-5 w-[90%]">
                <SheetHeader className="pt-4 px-0 pb-0">
                    <SheetTitle>
                        Informações da Reserva
                    </SheetTitle>
                </SheetHeader>

                <div className="flex items-end relative h-[180px] w-full mt-2">
                    <Image src="/map.png" alt={`Imagem do Mapa da Barberaria ${booking.service.barbershop.name}`} fill className="object-cover rounded-xl" />

                    <Card className="mb-3 mx-5 z-50 p-0 w-full rounded-xl">
                        <CardContent className="flex items-center gap-3 px-4 py-3">
                            <Avatar className="mt-1">
                                <AvatarImage src={barbershop.imageUrl} />
                            </Avatar>

                            <div>
                                <h3 className="font-bold">{barbershop.name}</h3>
                                <p className="text-xs">{barbershop.address}</p>
                            </div>

                        </CardContent>
                    </Card> 
                </div>
                
                <div className="mt-2">
                    <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
                        {isConfirmed ? "Falta Confirmar" : "Finalizado"}
                    </Badge>

                    <Card className="mt-3 mb-6 py-3">
                        <CardContent className="px-3 space-y-1">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <p className="text-sm font-bold">{Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL",}).format(Number(booking.service.price))}</p>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">Data</h2>
                                <p className="text-sm">{format(booking.date, "d 'de' MMMM", {locale: ptBR})}</p>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">Horário</h2>
                                <p className="text-sm">{format(booking.date, 'HH:mm', {locale: ptBR})}</p>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">Barbearia</h2>
                                <p className="text-sm">{barbershop.name}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        {barbershop.phones.map((phone, index) => (
                        <PhoneItem key={index} phone={phone} />
                    ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default BookingItem;