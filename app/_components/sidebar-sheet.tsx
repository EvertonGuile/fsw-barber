"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { quickSearchOptions } from "../_constants/search";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const SidebarSheet = () => {
    const {data} = useSession();
    // const handleLoginWithGoogleClick = async () => {
    //     await signIn("google")
    // }

    // função de logout do nextauth
    const handleLogoutClick = () => signOut();

    console.log(data?.user?.image)

    return (
        <SheetContent className="pt-3 px-5 overflow-y-auto">
            <SheetHeader className="pb-0 px-0">
                <SheetTitle className="font-bold">Menu</SheetTitle>
            </SheetHeader>

            <div className="pb-5 justify-between border-b flex gap-3 items-center">             

                {data?.user ? (
                    <div className="pl-1 flex items-center gap-3">
                        <Avatar className="mt-1 h-10 w-10">

                            <AvatarImage src={data?.user?.image ?? ""} width={18} height={18} />
                        </Avatar>

                        <div>
                            <p className="text-[#8162FF] font-bold">{data.user.name}</p>
                            <p className="text-gray-400 text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) : <>
                    <h2 className="font-bold">Olá, <span className="text-[#8162FF]">convidado</span>. Faça seu login!</h2>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="icon" className="bg-[#8162FF]">
                                <LogInIcon className="text-white" />
                            </Button>
                        </DialogTrigger>

                        {/* <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Faça seu login na plataforma
                                </DialogTitle>

                                <DialogDescription>
                                    Conecte-se usando sua conta do Google.
                                </DialogDescription>
                            </DialogHeader>

                            <Button className="gap-1 font-bold text-white" variant="outline" onClick={handleLoginWithGoogleClick} >
                                <Image alt="Logo do Google" src="/Google.svg" width={18} height={18}  />
                                Google
                            </Button>
                        </DialogContent> */}
                        <DialogContent>
                            <SignInDialog />
                        </DialogContent>
                    </Dialog>
                </>}


                {/* 
                </div>
            
                <div className="pb-3 flex flex-col gap-2 border-b">
                {/* <Button className="justify-start text-white bg-[#8162FF]"> */}
            </div>

            <div className="pb-3 flex flex-col border-b gap-2">
                <SheetClose className="justify-start" asChild>
                    <Button className="justify-start" variant="ghost" asChild>
                        <Link href="/">
                            <HomeIcon size={18} />
                            Início
                        </Link>
                    </Button>
                </SheetClose>
                <Button className="justify-start" variant="ghost">
                    <CalendarIcon size={18} />
                    Agendamentos
                </Button>
            </div>

            <div className="pb-3 flex flex-col gap-2">
                {quickSearchOptions.map((serviceOption) => (
                    <SheetClose key={serviceOption.title} asChild>
                        <Button className="px-3 justify-start" variant="ghost" asChild>
                            <Link href={`/barbershops?service=${serviceOption.title}`}>
                                <Image
                                    alt={"Ícone do serviço" + serviceOption.title}
                                    src={serviceOption.imageUrl}
                                    width={serviceOption.iconWidth}
                                    height={serviceOption.iconHeight}
                                    className={`${serviceOption.iconMargin}`}
                                />
                                
                                {serviceOption.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            {/*  */}
            {data?.user ? (
                <div className="flex flex-col gap-2 border-t pt-3">
                    <Button className="justify-start text-green-600 font-bold" variant="ghost" onClick={handleLogoutClick}>
                        <LogOutIcon size={18} className="stroke-3" />
                        Sair da conta
                    </Button>
                </div>
            ) : '' }
        </SheetContent>
    );
};

export default SidebarSheet;