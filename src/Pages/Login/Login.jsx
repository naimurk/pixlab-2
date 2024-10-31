import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { useToast } from "@/Components/ui/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import { useAppContext } from "@/context";
export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();
  const context = useAppContext();
  const { toast } = useToast();

  // Commented out current login functionality
  /*
  const handleLogin = async (googleCredential = null) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          googleCredential
            ? { googleCredential }
            : { email, password, loginMethod: "email" }
        ),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "🎉 Logged in successfully!",
        });
        localStorage.setItem("apptoken", data.accessToken);
        context.setsharedState({
          name: data.details.name,
          email: data.details.email,
          profileImg: data.details.profileImg,
          username: data.details.username,
          about: data.details.about,
          bookmarks: data.details.bookmarks,
          _id: data.details._id,
          accountType: data.details.accountType,
          planType: data.details.planType,
          posts: data.details.userPosts,
        });
        router(`/`);
      } else {
        toast({
          title: "😕",
          description: data.message || "An error occurred during login",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "😕",
        description: "An error occurred during login",
      });
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    handleLogin(credentialResponse.credential);
  };
  */

  // Sample login handler
  const handleSampleLogin = () => {
    toast({
      title: "🎉 Sample Login Triggered",
      description: "This is a placeholder for the login functionality."
    });
    // Here you would typically handle the login logic.
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <Card className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
              Log in to pixlab
            </h2>

            {loginMethod === "choose" && (
              <div className="space-y-4 flex flex-col items-center ">
                <Button
                  className="w-[200px]"
                  onClick={() => setLoginMethod("email")}
                >
                  Log in with Email
                </Button>
                {/* <div className="m-auto">
                <GoogleLogin
                  width={"200px"}
                  logo_alignment="left"
                  onSuccess={(response) => {
                    console.log("Google Login Success:", response);
                    // handleGoogleLoginSuccess(response);
                  }}
                  onError={() => {
                    console.log("Google Login Failed");
                    toast({
                      title: "😕",
                      description: "Google login failed",
                    });
                  }}
                />
              </div> */}
              </div>
            )}

            {loginMethod === "email" && (
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full" onClick={() => handleSampleLogin()}>
                  Log In
                </Button>
                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                  <Link
                    to="/reset-password"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </div>
            )}

            <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </Card>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2 bg-gray-950 ">
          <div className="h-full flex flex-col justify-center text-white p-8">
            <h3 className="text-3xl font-bold mb-4">Welcome back to pixlab</h3>
            <p className="text-xl mb-8">
              Transform your images into stunning visuals
            </p>
            <div className="bg-white/20 p-6 rounded-lg">
              <p className="italic text-lg">
                &ldquo; Best buy for me, helps me every day for making beautiful
                screenshots that I post on Twitter and LinkedIn &rdquo;
              </p>
              <p className="mt-4 font-semibold">- Alex M., Active User</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
