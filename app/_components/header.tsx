import Image from "next/image";
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button";
import { Calendar1Icon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import SidebarSheet from "./sidebar-sheet";

const Header = () => {
    return (
        // Card vem com py e gap
        // CardContent vem com px
        <Card className="p-0 rounded-none">
            <CardContent className="p-5 flex justify-between">
                <Image src="/Logo.png" width={120} height={18} alt="Logo da aplicação" />
                
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SidebarSheet />
                </Sheet>
            </CardContent>
        </Card>
    );
};

export default Header;