import { Barbershop } from "@/generated/prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface IBarbershopItemProps {
    barbershop: Barbershop;
};

const BarbershopItem = ({barbershop}: IBarbershopItemProps) => {
    return <Card className="min-w-[167px] pt-1 pb-0 rounded-2xl">
        <CardContent className="p-0 px-1 pb-2">
            {/* IMAGEM */}
            <div className="relative h-[159px]">
                <Image alt={barbershop.name} src={barbershop.imageUrl} fill className="object-cover rounded-t-xl" />

                <Badge className="absolute top-2 left-2" variant="secondary">
                    <StarIcon size={12} color="#8162FF" className="fill-[#8162FF]" />
                    {/* <StarIcon size={12} /> */}

                    <p className="text-xs font-semibold translate-y-px">5.0</p>
                </Badge>
            </div>

            {/* TEXTO */}
            <div className="pt-3 pb-2 px-1">
                <h3 className="font-semibold truncate">{barbershop.name}</h3>
                <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>

                <Button variant="secondary" className="w-full mt-3" asChild>
                    {/* Seta navegação nesse Button com o Link */}
                    <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
                </Button>
            </div>
        </CardContent>
    </Card>;
};

export default BarbershopItem;