/*
    Versão mental simplificada
        Esse arquivo basicamente diz:
            "Crie uma instância do Prisma.
            Se já existir uma instância global (em dev), reutilize.
            Se estiver em desenvolvimento, salve no global para não criar outra depois."
*/

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// armazenar string de conexão com o banco de dados
// o "!" é um non-null assertion operator, que diz, basicamente: "Confia em mim, isso não é undefined"
// const connectionString = process.env.DATABASE_URL!;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida");
}
const connectionString = process.env.DATABASE_URL;

// cria uma instância do adapter passando a string de conexão
const adapter = new PrismaPg({connectionString});

// configurar regra de instancia para PrismaClient não ter mais que um criado, tipando o global
// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined;
// };

declare global {
    // dica mais segura
    var cachedPrisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

// configuração de exportação do módulo de Instancia do PrismaClient para ser usado pela aplicação, e caso não houver uma instancia criada anteriormente, ele cria uma nova
/*
    // Equivalente à:

        if (globalForPrisma.prisma) {
            usar a existente
        } else {
            criar nova
        }
*/
// export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

// caso o ambiente seja setado como produção... NÃO ENTENDI ISSO TBM
// if(process.env.NODE_ENV !== "production") {
    // globalForPrisma.prisma = prisma;
// };

if(process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({adapter});
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient({adapter});
    };

    prisma = global.cachedPrisma;
};

// 
export const db = prisma;