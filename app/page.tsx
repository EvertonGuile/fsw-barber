import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import BookingItem from "./_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "./_lib/prisma";
import { Card, CardContent } from "./_components/ui/card";
import { quickSearchOptions } from "./_constants/search";
import SearchBar from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

const Home = async () => {

  const barbershops = await db.barbershop.findMany({});

  // Resolvendo problema da renderização do Booking com nova estrutura implementada
  const session = await getServerSession(authOptions);

  // continuação da resolução do problema
  // tratar caso não estiver logado
  const confirmedBookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  })
  : [];


  return (
    <div>
      <Header />

      <div className="p-5">
        {/* BOAS VINDAS / UserGreeting */}
        <div>
          <h2 className="text-xl font-bold">Olá, <span className="text-[#8162FF]">convidado</span>. Seja bem vindo!</h2>
          <p>Domingo, 08 de fevereiro.</p>
        </div>

        {/* BUSCA / SEARCH */}
        {/* <div className="mt-6 flex gap-2">
          <Input placeholder="Digite o que procura..." />
          <Button className="bg-[#8162FF] text-white">
            <SearchIcon strokeWidth={3} />
          </Button>
        </div> */}

        <div className="mt-2">
          <SearchBar />
        </div>

        {/* BUSCA RÁPIDA / QUICKSEARCH */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          
          {/* Itens Dinâmicos de uma Constante */}
          {quickSearchOptions.map(barbershopOption => (
            <Button variant="secondary" key={barbershopOption.title} asChild>
              <Link href={`/barbershops?service=${barbershopOption.title}`}>
                <Image
                  src={barbershopOption.imageUrl}
                  alt={`Ícone ${barbershopOption.title}`}
                  width={barbershopOption.iconWidth}
                  height={barbershopOption.iconHeight}
                />
                <p className="text-white">{barbershopOption.title}</p>
              </Link>
            </Button>
          ))}
          
          {/* Itens Mocados */}
          {/* <Button variant="secondary">
            <Image src="/barba.svg" alt="Ícone Barba" width={16} height={16} />
            <p className="text-white">Barba</p>
          </Button>
          <Button variant="secondary">
            <Image src="/cabelo.svg" alt="Ícone Cabelo" width={16} height={16} />
            <p className="text-white">Cabelo</p>
          </Button>
          <Button variant="secondary">
            <Image src="/pezinho.svg" alt="Ícone Pézinho" width={16} height={16} />
            <p className="text-white">Pézinho</p>
          </Button>
          <Button variant="secondary">
            <Image src="/sobrancelha.svg" alt="Ícone Sobrancelha" width={16} height={16} />
            <p className="text-white">Sobrancelha</p>
          </Button>
          <Button variant="secondary">
            <Image src="/hidratacao.svg" alt="Ícone Hidratação" width={9} height={16} />
            <p className="text-white">Hidratação</p>
          </Button>
          <Button variant="secondary">
            <Image src="/massagem.svg" alt="Ícone Massagem" width={14} height={16} />
            <p className="text-white">Massagem</p>
          </Button> */}
          {/* Fim itens mocados */}
        </div>

        {/* PROMOÇÃO / BANNER PROMOTION */}
        <div className="relative mt-6 h-37.5">
          <Image src="/banner-01.png" alt="Imagem do Banner" fill className="object-cover rounded-xl" />
        </div>

        {/* AGENDAMENTOS / APPOINTMENS */}
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Agendamentos</h2>
        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">

          
          {/* <BookingItem /> */}

          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        {/* BARBEARIAS RECOMENDADAS / TOP BARBERS */}
        <div>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Recomendados</h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map(barbershop =>
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )}
          </div>
        </div>

        {/* BARBEARIAS POPULARES / POPULAR BARBERS */}
        <div>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Populares</h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map(barbershop =>
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )}
          </div>
        </div>



      </div>

      
    </div>
  );
};

export default Home;