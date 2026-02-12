import { BarbershopService } from "@/generated/prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface IServiceItemProps {
    service: BarbershopService;
};

const ServiceItem = ({service}: IServiceItemProps) => {
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
                        <Button size="sm" variant="secondary">
                            Reservar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ServiceItem;