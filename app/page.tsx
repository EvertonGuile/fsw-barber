import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import BookingItem from "./_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "./_lib/prisma";
import { Card, CardContent } from "./_components/ui/card";

const Home = async () => {

  const barbershops = await db.barbershop.findMany({});


  return (
    <div>
      <Header />

      <div>
        {/* BOAS VINDAS / UserGreeting */}
        <div>
          <h2>Olá, convidado. Seja bem vindo!</h2>
          <p>Domingo, 08 de fevereiro.</p>
        </div>
        {/* BUSCA / SEARCH */}
        <div>
          <Input placeholder="Digite o que procura..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        {/* BUSCA RÁPIDA / QUICKSEARCH */}
        <div>
          {/* Itens Mocados */}
          <Button>
            <Image src="/barba.svg" alt="Ícone Barba" width={16} height={16} />
            <p>Barba</p>
          </Button>
          <Button>
            <Image src="/cabelo.svg" alt="Ícone Cabelo" width={16} height={16} />
            <p>Cabelo</p>
          </Button>
          <Button>
            <Image src="/pezinho.svg" alt="Ícone Pézinho" width={16} height={16} />
            <p>Pézinho</p>
          </Button>
          <Button>
            <Image src="/sobrancelha.svg" alt="Ícone Sobrancelha" width={16} height={16} />
            <p>Sobrancelha</p>
          </Button>
          <Button>
            <Image src="/hidratacao.svg" alt="Ícone Hidratação" width={9} height={16} />
            <p>Hidratação</p>
          </Button>
          <Button>
            <Image src="/massagem.svg" alt="Ícone Massagem" width={14} height={16} />
            <p>Massagem</p>
          </Button>
          {/* Fim itens mocados */}
        </div>
        {/* PROMOÇÃO / BANNER PROMOTION */}
        <div className="relative h-37.5">
          <Image src="/banner-01.png" alt="Imagem do Banner" fill className="object-cover" />
        </div>

        {/* AGENDAMENTOS / APPOINTMENS */}
        <div>
          <h2>Agendamentos</h2>

          <BookingItem />
        </div>

        {/* BARBEARIAS RECOMENDADAS / TOP BARBERS */}
        <div>
          <h2>Recomendados</h2>

          {barbershops.map(barbershop =>
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          )}
        </div>

        {/* FOOTER */}
        <footer>
          <Card>
            <CardContent>
              <p>@ 2026 Copyright <span className="font-bold">CapijavaScript</span></p>
            </CardContent>
          </Card>
        </footer>


      </div>

    </div>
  );
};

export default Home;