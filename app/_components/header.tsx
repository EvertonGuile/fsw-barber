import Image from "next/image";
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return (
        // Card vem com py e gap
        // CardContent vem com px
        <Card>
            <CardContent>
                <Image src="/next.svg" width={80} height={20} alt="Logo da aplicação" />
                <Button>
                    <MenuIcon />
                </Button>
            </CardContent>
        </Card>
    );
};

export default Header;