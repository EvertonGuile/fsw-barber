import { Card, CardContent } from "./ui/card"

const Footer = () => {
    return (
        <footer className="mt-3">
          <Card className="rounded-none">
            <CardContent>
              <p className="text-sm text-gray-400">@ 2026 Copyright <span className="font-bold">CapijavaScript</span></p>
            </CardContent>
          </Card>
        </footer>
    );
};

export default Footer;