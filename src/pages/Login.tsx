import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-earth flex flex-col">
      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-medium">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Agent Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to access the Klima360 platform
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-transparent border-none">
            <SignIn
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-green-700 hover:bg-green-600 ",
                },
              }}
            />
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Need help? Contact your system administrator</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
