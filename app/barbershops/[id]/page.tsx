import BackButton from "@/app/_components/back_button";
import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, SmartphoneIcon, StarIcon } from "lucide-react";
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
        },
        include: {
            services: true
        }
    });

    if (!barbershop) {
        return notFound();
    };

    const handleCopyPhoneClick = (phone: string) => {
        navigator.clipboard.writeText(phone);
    };

    return <div>
        <div className="relative w-full h-[250px]">
            <Image alt={"Imagem da barbearia" + barbershop?.name} src={barbershop?.imageUrl} fill className="object-cover" />

            <Button size="icon" variant="secondary" className="absolute top-4 left-4" asChild>
                {/* <Link href="/" >
                    <ChevronLeftIcon />
                </Link> */}
                <BackButton />
            </Button>

            {/* <Button size="icon" variant="secondary" className="absolute top-4 right-4">
                <MenuIcon />
            </Button> */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="absolute right-4 top-4">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>

                <SidebarSheet />
            </Sheet>
        </div>

        <div className="p-5 border-b">
            <h1 className="font-bold text-xl mb-3">{barbershop?.name}</h1>

            <div className="flex items-center gap-2 mb-2">
                <MapPinIcon className="text-[#8162FF]" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
            </div>

            <div className="flex items-center gap-2">
                <StarIcon className="fill-[#8162FF] text-[#8162FF]" size={18} />
                <p>5,0 (245 avaliações)</p>
            </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="p-5 border-b space-y-3">
            <h2 className="uppercase font-bold text-gray-400 text-xs">Sobre nós</h2>
            <p className="text-sm text-justify">{barbershop?.description}</p>
        </div>

        {/* SERVIÇOS */}
        <div className="p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>

            <div className="space-y-3">
                {barbershop.services.map(service => <ServiceItem key={service.id} service={service} />)}
            </div>
        </div>

        {/* CONTATO */}
        <div className="space-y-3 p-5">
            {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
            ))}
            {/* {barbershop.phones.map((phone) => (
                <div className="flex justify-between" key={phone}>
                    <div className="flex items-center gap-2">
                        <SmartphoneIcon />
                        <p className="text-sm">{phone}</p>
                    </div>

                    <Button variant="outline" size="sm" onClick={() => handleCopyPhoneClick (phone)}>Copiar</Button>
                </div>
            ))} */}
        </div>
    </div>
};

export default BarbershopPage;