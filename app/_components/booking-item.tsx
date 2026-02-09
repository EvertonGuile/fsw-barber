import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const BookingItem = () => {
    return (
        <Card>
            <CardContent>
                <div>
                    <Badge>
                        Falta confirmar
                    </Badge>
                    <h3>Corte de Cabelo</h3>

                    <div>
                        <Avatar>
                            <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                        </Avatar>

                        <p>AP Barbearia Premium</p>
                    </div>
                </div>

                <div>

                </div>
            </CardContent>
        </Card>
    );
};

export default BookingItem;