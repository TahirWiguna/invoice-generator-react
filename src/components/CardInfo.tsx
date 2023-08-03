import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CardInfo = () => {
    return (
        <Alert variant="default" className="mb-4 w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>TESTING</AlertDescription>
        </Alert>
    );
};

export default CardInfo;
