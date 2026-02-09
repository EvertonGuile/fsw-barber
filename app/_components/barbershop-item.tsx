import { Barbershop } from "@/generated/prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";

interface IBarbershopItemProps {
    barbershop: Barbershop;
};

const BarbershopItem = ({barbershop}: IBarbershopItemProps) => {
    return <Card>
        <CardContent>
            {/* IMAGEM */}
            <div className="relative h-[159px]">
                <Image alt={barbershop.name} src={barbershop.imageUrl} fill className="object-cover" />

                <Badge className="absolute top-2 left-2">
                    <StarIcon size={12} color="#8162FF" className="fill-[#8162FF]" />

                    <p>5.0</p>
                </Badge>
            </div>

            {/* TEXTO */}
            <div>
                <h3>{barbershop.name}</h3>
                <p>{barbershop.address}</p>

                <Button className="w-full">
                    Reservar
                </Button>
            </div>
        </CardContent>
    </Card>;
};

export default BarbershopItem;