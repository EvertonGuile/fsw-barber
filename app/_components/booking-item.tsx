import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const BookingItem = () => {
    return (
        <Card className="p-0">
            <CardContent className="flex justify-between p-0">
                {/* ESQUERDA */}
                <div className="flex flex-col gap-2 py-5 pl-5">
                    <Badge className="w-fit bg-[#8162FF] text-white">
                        Falta confirmar
                    </Badge>
                    <h3 className="font-semibold">Corte de Cabelo</h3>

                    <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                        </Avatar>

                        <p className="text-sm">AP Barbearia Premium</p>
                    </div>
                </div>

                {/* DIREITA */}
                <div className="flex flex-col items-center justify-center px-5 border-l-2">
                    <p className="text-sm font-bold">Fevereiro</p>
                    <p className="text-2xl font-bold">13</p>
                    <p className="text-sm font-semibold">09:30</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingItem;