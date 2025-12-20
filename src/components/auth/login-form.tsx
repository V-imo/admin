"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [challengeData, setChallengeData] = useState<{
    session: string;
    username: string;
  } | null>(null);

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (challengeData) {
        // Handle new password challenge
        if (newPassword !== confirmNewPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
          toast.error(passwordError);
          setLoading(false);
          return;
        }

        // For challenge completion, we only need username, session, and newPassword
        const result = await signIn("cognito", {
          username: challengeData.username,
          password: "", // Not needed for challenge completion
          session: challengeData.session,
          newPassword: newPassword,
          redirect: false,
        });

        if (result?.error) {
          // Try to extract specific error message from Cognito
          let errorMessage = "Password change failed";

          try {
            const errorData = JSON.parse(result.error);
            if (errorData.message) {
              errorMessage = errorData.message;
            }
          } catch {
            // If error is not JSON, use the raw error message
            errorMessage = result.error;
          }

          // Check for specific Cognito password policy errors and translate them
          const errorLower = errorMessage.toLowerCase();
          if (errorLower.includes("uppercase")) {
            toast.error("Password must contain at least one uppercase letter");
          } else if (errorLower.includes("lowercase")) {
            toast.error("Password must contain at least one lowercase letter");
          } else if (
            errorLower.includes("number") ||
            errorLower.includes("digit")
          ) {
            toast.error("Password must contain at least one number");
          } else if (
            errorLower.includes("special") ||
            errorLower.includes("symbol")
          ) {
            toast.error("Password must contain at least one special character");
          } else if (
            errorLower.includes("length") ||
            errorLower.includes("8")
          ) {
            toast.error("Password must be at least 8 characters long");
          } else {
            // Show the original error message if it's informative
            toast.error(errorMessage);
          }

          setLoading(false);
        } else if (result?.ok) {
          toast.success("Password changed successfully");
          router.push("/");
          router.refresh();
        }
      } else {
        // Regular sign in
        const result = await signIn("cognito", {
          username: email,
          password,
          redirect: false,
        });

        if (result?.error) {
          // Check if it's a challenge error
          try {
            const errorData = JSON.parse(result.error);
            if (errorData.challengeName === "NEW_PASSWORD_REQUIRED") {
              setChallengeData({
                session: errorData.session,
                username: errorData.username,
              });
              toast.info("New password required");
              setLoading(false);
              return;
            }
          } catch {
            // Not a challenge error, continue with regular error handling
          }

          toast.error("Invalid credentials");
          setLoading(false);
        } else if (result?.ok) {
          toast.success("Login successful");
          router.push("/");
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          {challengeData ? "Set new password" : "Enter credentials"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={challengeData?.username || email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!challengeData || loading}
              required
              autoComplete="email"
            />
          </div>

          {!challengeData && (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                autoComplete="current-password"
              />
            </div>
          )}

          {challengeData && (
            <>
              <div>
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
                </p>
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">
                  Confirm new password
                </Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  disabled={loading}
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {challengeData ? "Changing password" : "Signing in"}
              </>
            ) : challengeData ? (
              "Change password"
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}