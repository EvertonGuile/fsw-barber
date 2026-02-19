import Image from "next/image";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
    const handleLoginWithGoogleClick = async () => {
        await signIn("google")
    }

    return (
        <>
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
        </>
    );
};

export default SignInDialog;