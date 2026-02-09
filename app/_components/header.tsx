import Image from "next/image";
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return (
        // Card vem com py e gap
        // CardContent vem com px
        <Card className="p-0 rounded-none">
            <CardContent className="p-5 flex justify-between">
                <Image src="/Logo.png" width={120} height={18} alt="Logo da aplicação" />
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </CardContent>
        </Card>
    );
};

export default Header;