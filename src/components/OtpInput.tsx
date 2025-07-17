import { Input } from "@/components/ui/input";
import { useRef, useEffect } from "react";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
};

export const OtpInput = ({ length = 4, value, onChange }: OtpInputProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (value.length < length) {
      inputsRef.current[value.length]?.focus();
    }
  }, [value, length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const otpArr = value.split("");
      otpArr[index] = val;
      const newOtp = otpArr.join("").padEnd(length, "");
      onChange(newOtp);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(paste)) {
      onChange(paste.padEnd(length, ""));
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="text-center font-semibold text-lg w-12 h-12"
        />
      ))}
    </div>
  );
};
