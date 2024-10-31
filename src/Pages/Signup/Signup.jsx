import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { useToast } from "@/Components/ui/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import { useAppContext } from "@/context";
import { host } from "@/host";
export default function SignUpPage() {
  const [signupMethod, setSignupMethod] = useState("choose");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const router = useNavigate();
  const context = useAppContext();

  const { toast } = useToast();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.trim() !== "" && password.length >= 8 && !/\s/.test(password)
    );
  };

  const handleSignUp = async () => {
    if (signupMethod === "email") {
      if (!validateEmail(email)) {
        return toast({
          title: "😣",
          description: "Invalid email address"
        });
      }
      if (name.trim() === "") {
        return toast({
          title: "😣",
          description: "Name cannot be empty"
        });
      }
      if (!validatePassword(password)) {
        return toast({
          title: "😣",
          description:
            "Password must be at least 8 characters long and without whitespace"
        });
      }
    }

    if (!/^[\w_]{1,30}$/.test(username)) {
      return toast({
        title: "😣",
        description: "Invalid username format"
      });
    }

    try {
      const response = await fetch(`${host}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          username,
          password,
          profileImg,
          signUpMethod: signupMethod
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "🎉 Account created successfully!"
        });
        localStorage.setItem("apptoken", data.accessToken);
        sessionStorage.setItem("newuser", true);
        context.setsharedState({
          name: data.details.name,
          email: data.details.email,
          profileImg: data.details.profileImg,
          username: data.details.username,
          about: data.details.about,
          bookmarks: data.details.bookmarks,
          _id: data.details._id,
          accountType: data.details.accountType,
          posts: []
        });
        router(`/`);
      } else {
        toast({
          title: "😕",
          description: data.message || "An error occurred during signup"
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "😕",
        description: "An error occurred during signup"
      });
    }
  };

  // const handleGoogleSignUpSuccess = async (credentialResponse) => {
  //   try {
  //     const response = await fetch(`${host}/auth/google-signup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ credential: credentialResponse.credential }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setName(data.name);
  //       setEmail(data.email);
  //       setProfileImg(data.picture);
  //       setSignupMethod("google");
  //     } else {
  //       toast({
  //         title: "😕",
  //         description: data.message || "Google Signup failed",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Google Signup error:", error);
  //     toast({
  //       title: "😕",
  //       description: "An error occurred during Google Signup",
  //     });
  //   }
  // };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <Card className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
              Sign Up for pixlab
            </h2>

            {signupMethod === "choose" && (
              <div className="space-y-4 flex flex-col items-center">
                <Button
                  className="w-[200px]"
                  onClick={() => setSignupMethod("email")}
                >
                  Sign up with Email
                </Button>

                <div className="m-auto">
                  {/* <GoogleLogin
                  width={"200px"}
                  logo_alignment="left"
                  onSuccess={handleGoogleSignUpSuccess}
                  onError={() => {
                    console.log("Google Login Failed");
                  }}
                /> */}
                </div>
              </div>
            )}

            {signupMethod === "email" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button className="w-full" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </div>
            )}

            {signupMethod === "google" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button className="w-full" onClick={handleSignUp}>
                  Complete Sign Up
                </Button>
              </div>
            )}

            <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Log in
              </Link>
            </p>
          </Card>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gray-950 ">
          <div className="h-full flex flex-col justify-center text-white p-8">
            <h3 className="text-3xl font-bold mb-4">Welcome to pixlab</h3>
            <p className="text-xl mb-8">
              Transform your images into stunning visuals
            </p>
            <div className="bg-white/20 p-6 rounded-lg">
              <p className="italic text-lg">
                &ldquo; Best buy for me, helps me everyday for making beautiful
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
