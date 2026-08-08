import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProfileRequiredAlert() {
  const router = useRouter();

  return (
    <div className="container max-w-4xl py-12 mx-auto">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Profile Found</AlertTitle>
        <AlertDescription>
          You need to complete your profile with birth date and time to view deep insights.
          <div className="mt-4">
            <Button onClick={() => router.push('/profile')} variant="outline" className="bg-background">
              Go to Profile
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
