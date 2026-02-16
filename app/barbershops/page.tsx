import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import SearchBar from "../_components/search";
import { db } from "../_lib/prisma";

interface IBarbershopsPageProps {
    searchParams: {
        title?: string
        service?: string
    };
};

const BarbershopsPage = async ({searchParams}: IBarbershopsPageProps) => {
    const dataSearch = await searchParams;
    const barbershops = await db.barbershop.findMany({
        where: {
            OR: [
                dataSearch?.title ? {
                    name: {
                        contains: dataSearch.title,
                        mode: "insensitive",
                    },
                } : {},
                dataSearch.service ? {
                    services: {
                        some: {
                            name: {
                                contains: dataSearch.service,
                                mode: "insensitive",
                            },
                        },
                    },
                }: {},
            ],
        },
    });
    return <div>
        <Header />

        <div className="px-5">
            <div className="mt-4 mb-2">
                <SearchBar />
            </div>

            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Resultados para &quot;{dataSearch?.title || dataSearch?.service}&quot;</h2>

            <div className="grid grid-cols-2 gap-4">
                {barbershops.map((barbershop) => ( <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
            </div>
        </div>
    </div>
};

export default BarbershopsPage;