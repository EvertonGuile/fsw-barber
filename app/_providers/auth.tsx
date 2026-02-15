"use client"

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";


// constante que recebe o children tipado como React.ReactNode como prop e renderiza o Componente Session Provider passando o children dentro desse Componente
const AuthProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
};

export default AuthProvider;