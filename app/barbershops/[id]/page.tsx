import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// criar interface para definir tipagem para propriedade recebida e evitar que ela seja tipada como any
interface BarbershopProp {
    params: {
        id: string
    };
};

// a partir do Next 14+ o params se tornou Promisse e necessita de ser assíncrono
// tipar com oq definimos na Interface
const BarbershopPage = async ({params}: BarbershopProp) => {
    // desestruturar recebendo apenas id do params
    const {id} = await params;
    // armazena uma query no banco onde encontra um registro onde o id do banco seja o mesmo do id capturado acima (que vem do Link do Button do Card da Barbearia)
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: id
        }
    });

    if (!barbershop) {
        return notFound();
    };

    return <div>
        <div className="relative w-full h-[250px]">
            <Image alt={"Imagem da barbearia" + barbershop?.name} src={barbershop?.imageUrl} fill className="object-cover" />

            <Button size="icon" variant="secondary" className="absolute top-4 left-4" asChild>
                <Link href="/" >
                    <ChevronLeftIcon />
                </Link>
            </Button>

            <Button size="icon" variant="secondary" className="absolute top-4 right-4">
                <MenuIcon />
            </Button>
        </div>

        <div className="p-5 border-b">
            <h1 className="font-bold text-xl mb-3">{barbershop?.name}</h1>

            <div className="flex items-center gap-1 mb-2">
                <MapPinIcon className="text-[#8162FF]" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
            </div>

            <div className="flex items-center gap-1">
                <StarIcon className="fill-[#8162FF] text-[#8162FF]" size={18} />
                <p>5,0 (245 avaliações)</p>
            </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="p-5 border-b space-y-3">
            <h2 className="uppercase font-bold text-gray-400 text-xs">Sobre nós</h2>
            <p className="text-sm text-justify">{barbershop?.description}</p>
        </div>
    </div>
};

export default BarbershopPage;