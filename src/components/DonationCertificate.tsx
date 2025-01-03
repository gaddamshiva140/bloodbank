import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

interface DonationCertificateProps {
  donorName: string;
  onClose: () => void;
}

export const DonationCertificate = ({ donorName, onClose }: DonationCertificateProps) => {
  const downloadCertificate = async () => {
    const certificate = document.getElementById("donation-certificate");
    if (certificate) {
      const canvas = await html2canvas(certificate);
      const link = document.createElement("a");
      link.download = "blood-donation-certificate.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-3xl w-full bg-white p-8" id="donation-certificate">
        <div className="relative">
          <img 
            src="/lovable-uploads/81669374-3c99-4537-943d-3a8c64e29c5d.png" 
            alt="Certificate Background" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-bold mb-8">CERTIFICATE</h2>
            <h3 className="text-2xl mb-4">OF BLOOD DONATION</h3>
            <p className="text-xl mb-8">Proudly Presented to:</p>
            <p className="text-3xl font-bold mb-12 border-b-2 border-gray-800 pb-2">{donorName}</p>
            <p className="text-center max-w-md mb-16">
              For their generous contribution to saving lives through blood donation.
              Your selfless act makes a significant difference in our community.
            </p>
            <div className="text-center">
              <p className="font-bold">PRODUCTION MANAGER</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={downloadCertificate}>
            <Download className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
          <Button variant="outline" onClick={() => {
            onClose();
            toast.success("Thank you for participating in blood donation!");
          }}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
};