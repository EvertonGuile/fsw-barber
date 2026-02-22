import { getServerSession } from "next-auth";
import Header from "../_components/header"
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";

const  Bookings = async () => {
    // para pegar dados de usuário logado
    const session = await getServerSession(authOptions);
    // // caso não tenha usuário logado retorna página not found
    if (!session?.user) {
        // TODO: mostrar pop-uo de login
        return notFound();
    };
    // // chamar o banco de dados buscando dados de um usuário logado
    // const bookings = await db.booking.findMany({
    //     // busca agendamentos realizados pelo usuário de acordo com o id
    //     where: {
    //         userId: (session.user as any).id
    //     },
    //     // faz o join para buscar o serviço agendado
    //     include: {
    //         service: {
    //             include: {
    //                 barbershop: true
    //             }
    //         }
    //     }
    // })

    // QUERY para separar os agendamentos "Falta Confirmar" dos "Finalizados"
    const upcomingBookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
            date: {
                gte: new Date(),
            }
        },
        include: {
            service: {
                include: {
                    barbershop: true,
                },
            },
        },
        orderBy: {
            date: "asc",
        },
    })

    const concludedBookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
            date: {
                lt: new Date(),
            },
        },
        include: {
            service: {
                include: {
                    barbershop: true,
                },
            },
        },
        orderBy: {
            date: "desc",
        },
    });

    // poderia fazer isso para separar os Confirmados/Finalizados dos Falta Confirmar, PORÉM IREMOS FAZER OUTRA QUERY ACIMA PARA NÃO OCUPAR MEMÓRIA NA CHAMADA AO BANCO COM O FILTER
        // const confirmedBookings = bookings.filter((booking) => booking.date > new Date());
        // const pastBookings = bookings.filter((booking) => booking.date <= new Date());

    return (
        <>
            <Header />

            <div className="p-5 space-y-3">
                <h1 className="font-bold text-xl">Agendamentos</h1>

                {/* {bookings.map(booking => <BookingItem key={booking.id} booking={booking} />)} */}
                
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Falta Confirmar</h2>
                
                {upcomingBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}

                {/*  */}
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Finalizados</h2>
                
                {concludedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
            </div>
        </>
    );
};

export default Bookings;