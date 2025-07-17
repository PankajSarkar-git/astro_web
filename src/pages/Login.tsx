import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser, verifyOtp } from "@/store/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showToast } from "@/components/toast";
import { OtpInput } from "@/components/OtpInput";

const Login = () => {
  const dispatch = useAppDispatch();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!showOtpBox) {
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
      // showToast.error(err?.message || "Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--color-bg)" }}
    >
      <Card
        className="w-full max-w-md shadow-xl rounded-2xl"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <CardHeader>
          <CardTitle
            className="text-center text-2xl"
            style={{ color: "var(--color-primary)" }}
          >
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="mobile" className="mb-2 text-sm">
                Mobile Number
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={showOtpBox}
              />
            </div>

            {showOtpBox && (
              <div className="space-y-3 pt-4">
                <div
                  className="text-center text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  OTP sent:{" "}
                  <span className="text-black font-semibold">{serverOtp}</span>
                </div>
                <Label className="text-sm">Enter OTP</Label>
                <OtpInput length={4} value={otp} onChange={setOtp} />
              </div>
            )}

            <Button
              className="w-full mt-2"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
              }}
              disabled={loading || !mobile || (showOtpBox && otp.length < 4)}
              type="submit"
            >
              {loading
                ? "Processing..."
                : showOtpBox
                ? "Verify OTP"
                : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
