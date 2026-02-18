"use client"

import { Barbershop, BarbershopService } from "@/generated/prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { format, set, setMinutes } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface IServiceItemProps {
    service: BarbershopService;
    barbershop: Pick<Barbershop, "name">
};

// 
const TIME_LIST = [
    "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00"
];

const ServiceItem = ({service, barbershop}: IServiceItemProps) => {

    const [selectedDay, setSeletedDay] = useState<Date | undefined>(undefined);

    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const {data} = useSession();

    // confirma se vem o data com os dados do user logado
    // console.log({data})

    const handleDateSelect = (date: Date | undefined) => {
        setSeletedDay(date);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleCreateBooking = async () => {
        try {
            // se não tiver algum dos dois selecionados no calendario || horarios ele sai da função
            if (!selectedDay || !selectedTime) return;
            
            // pega hora / pega munuto do horario selecinado
            const hour = Number(selectedTime.split(":")[0]);
            const minute = Number(selectedTime.split(":")[1]);
            
            // 
            const newDate = set(selectedDay, {
                minutes: minute,
                hours: hour
            });

            await createBooking({
                serviceId: service.id,
                // userId: "cmlo45yni0000fslqxsf4t5tp",
                userId: (data?.user as any).id,
                date: newDate,
            })

            toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar reserva!")
        }
    }

    return (
        <Card className="p-0">
            <CardContent className="flex items-center gap-3 p-3">
                {/* ESQUERDA */}
                <div className="relative min-h-[110px] max-h-[110px] min-w-[110px] max-w-[110px]">
                    <Image src={service.imageUrl} alt={"Imagem do serviço" + service.imageUrl} fill className="object-cover rounded-xl" />
                </div>
                {/* DIREITA */}
                <div className="space-y-3 flex-1">
                    <h3 className="font-semibold text-sm">{service.name}</h3>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                    {/* PREÇO E BOTÃO */}
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-sm text-[#8162FF]">{Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}
                        </p>

                        <Sheet>
                            <SheetTrigger>
                                <Button size="sm" variant="secondary">
                                    Reservar
                                </Button>
                            </SheetTrigger>

                            
                                <SheetContent className="gap-0 overflow-y-scroll">
                                    <SheetHeader>
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>

                                    <div>
                                        <div className="flex border-b">
                                            <Calendar className="flex-1 px-4" mode="single" locale={ptBR}
                                            selected={selectedDay}
                                            onSelect={handleDateSelect}
                                            styles={{
                                                
                                                                        // div container que envolve todo o calendário
                                                                        month: {
                                        textTransform: "capitalize",
                                                                        },
                                        // div que envolve a navegação com as setas do mês
                                        nav: {
                                            color: "#8162FF",
                                            fontSize: "24px"
                                        },
                                            // div com o mês e ano selecionado
                                            month_caption: {
                                        
                                            },
                                        // div que envolve as divs filhas dias da semana e semanas do mês COM ESPAÇAMENTO ENTRE CABEÇALHO DO CALENDÁRIO
                                        month_grid: {
                                        
                                        },
                                            // div dias da semana
                                            weekdays: {
                                        
                                            },
                                                // cada dia da semana dentro da div
                                                weekday: {
                                        
                                                },
                                            // div semanas do mês
                                            weeks: {
                                        
                                            },
                                                // divs que separam por semanas dentro da div pai semanas do mês
                                                week: {
                                        
                                                },
                                                    // botões dos dias do mês
                                                    day_button: {
                                        
                                                    },
                                                                        }}
                                        />
                                        </div>
                                        {selectedDay && (
                                            <div className={`p-5 gap-3 flex overflow-x-auto [&::-webkit-scrollbar]:hidden ${selectedDay && "border-b" }`}>
                                                {TIME_LIST.map(time => <Button key={time} variant={selectedTime === time ? "default" : "ghost"} className="rounded-full border-[3px] border-gray hover:border-[3px] hover:border-white"
                                                onClick={() => handleTimeSelect(time)}
                                                >
                                                    {time}
                                                </Button>)}
                                            </div>
                                        )}
                                        {selectedTime && selectedDay && (
                                            <div className="p-5">
                                                <Card className="py-3">
                                                    <CardContent className="px-3 space-y-1">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="font-bold">{service.name}</h2>
                                                            <p className="text-sm font-bold">{Intl.NumberFormat("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL",
                                                            }).format(Number(service.price))}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">Data</h2>
                                                            <p className="text-sm">{format(selectedDay, "d 'de' MMMM", {locale: ptBR})}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">Horário</h2>
                                                            <p className="text-sm">{selectedTime}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                                                            <p className="text-sm">{barbershop.name}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}
                                    </div>

                                    <SheetFooter className="px-5">
                                        <SheetClose>
                                            <Button onClick={handleCreateBooking} className="w-full" disabled={!selectedDay || !selectedTime}>Confirmar</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ServiceItem;