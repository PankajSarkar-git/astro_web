import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser, verifyOtp } from "@/store/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showToast } from "@/components/toast";
import { OtpInput } from "@/components/OtpInput";
import { Star } from "lucide-react";
import logo from "../assets/logo.png";
const Login = () => {
  const dispatch = useAppDispatch();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!showOtpBox) {
        // Send only the mobile number without +91 prefix
        const response = await dispatch(loginUser({ mobile })).unwrap();
        if (response.success) {
          showToast.success(response.msg);
          setServerOtp(response.otp);
          setShowOtpBox(true);
        }
      } else {
        const response = await dispatch(verifyOtp({ mobile, otp })).unwrap();
        showToast.success("Login Successful");
        console.log("Verified Token:", response.token);
      }
    } catch (err: any) {
      showToast.error(err?.message || "Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-xl border border-gray-200 bg-white">
        <CardHeader className="text-center pb-6">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-md">
                <img
                  src={logo}
                  alt="Logo"
                  className="size-16 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";
                  }}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* App Name */}
          <CardTitle className="text-2xl font-bold text-slate-800 mb-1">
            Astrosevaa
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Your Digital Astrology Companion
          </p>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <div className="space-y-5">
            <div>
              <Label
                htmlFor="mobile"
                className="mb-2 text-sm font-medium text-gray-700 block"
              >
                Mobile Number
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm">
                  +91
                </div>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={handleMobileChange}
                  disabled={showOtpBox}
                  className="pl-12 h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-slate-600 focus:ring-slate-600/20 rounded-lg"
                  maxLength={10}
                />
              </div>
              {mobile.length > 0 && mobile.length < 10 && (
                <p className="text-red-500 text-xs mt-1">
                  Mobile number must be 10 digits
                </p>
              )}
            </div>

            {showOtpBox && (
              <div className="space-y-4 pt-2">
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-sm mb-2">
                    OTP sent to +91 {mobile}
                  </p>
                  <div className="inline-block px-3 py-1 bg-white rounded-md border border-gray-300">
                    <span className="text-slate-800 font-bold text-lg tracking-widest">
                      {serverOtp}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Enter OTP
                  </Label>
                  <OtpInput length={4} value={otp} onChange={setOtp} />
                </div>
              </div>
            )}

            <Button
              className="w-full h-11 mt-6 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                loading ||
                !mobile ||
                mobile.length < 10 ||
                (showOtpBox && otp.length < 4)
              }
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : showOtpBox ? (
                "Verify OTP"
              ) : (
                "Send OTP"
              )}
            </Button>

            {!showOtpBox && (
              <p className="text-center text-gray-500 text-xs mt-4">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
