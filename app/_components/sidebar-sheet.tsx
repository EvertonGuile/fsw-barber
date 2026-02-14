import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { quickSearchOptions } from "../_constants/search";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const SidebarSheet = () => {
    return (
        <SheetContent className="pt-3 px-5 overflow-y-auto">
            <SheetHeader className="pb-0 px-0">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="pb-5 pl-1 justify-between border-b flex gap-3 items-center">
                <h2 className="font-bold">Olá, <span className="text-[#8162FF]">convidado</span>. Faça seu login!</h2>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon" className="bg-[#8162FF]">
                            <LogInIcon className="text-white" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Faça seu login na plataforma
                            </DialogTitle>

                            <DialogDescription>
                                Conecte-se usando sua conta do Google.
                            </DialogDescription>
                        </DialogHeader>

                        <Button className="gap-1 font-bold text-white" variant="outline">
                            <Image alt="Logo do Google" src="/Google.svg" width={18} height={18}  />
                            Google
                        </Button>
                    </DialogContent>
                </Dialog>

                {/* <Avatar className="mt-1">
                    <AvatarImage src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww" />
                </Avatar> */}

                {/* <div>
                    <p className="font-bold">Diogo Nogueira</p>
                    <p className="text-xs">diogo@nogueira.com</p>
                </div> */}
            </div>
            
            <div className="pb-3 flex flex-col gap-2 border-b">
                {/* <Button className="justify-start text-white bg-[#8162FF]"> */}
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

            <div className="pb-3 flex flex-col border-b gap-2">
                {quickSearchOptions.map((serviceOption) => (
                    <Button key={serviceOption.title} className="px-3 justify-start" variant="ghost">
                        <Image alt={"Ícone do serviço" + serviceOption.title} src={serviceOption.imageUrl} width={15} height={16} />
                        {serviceOption.title}
                    </Button>
                ))}
            </div>

            <div className="flex flex-col gap-2 border-b pb-5">
                <Button className="justify-start" variant="ghost">
                    <LogOutIcon size={18} />
                    Sair da conta
                </Button>
            </div>
        </SheetContent>
    );
};

export default SidebarSheet;