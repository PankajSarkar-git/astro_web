
import { useForm } from "react-hook-form";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  createAstrologer,
  editAstrologer,
  getAstrologerById,
} from "@/store/astrologers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showToast } from "./toast";

// ------------------ Interfaces ------------------
export interface AstrologerPayload {
  name: string;
  mobile: string;
  expertise: string;
  experienceYears: number;
  pricePerMinuteChat: number;
  pricePerMinuteVoice: number;
  pricePerMinuteVideo: number;
  about: string;
}

export interface CreateAstrologerThunkInput {
  astrologerData: AstrologerPayload;
  imageFile?: File;
}

export interface EditAstrologerThunkInput extends CreateAstrologerThunkInput {
  id: string;
}

type AstrologerFormData = AstrologerPayload & {
  profileImage?: FileList;
};

// ------------------ Form Field Config ------------------
const formFields = [
  {
    name: "name" as const,
    label: "Name",
    type: "text",
    placeholder: "Ravi Sharma",
    validation: { required: "Name is required" },
  },
  {
    name: "mobile" as const,
    label: "Mobile",
    type: "text",
    placeholder: "9876543210",
    validation: {
      required: "Mobile number is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Enter a valid 10-digit number",
      },
    },
  },
  {
    name: "expertise" as const,
    label: "Expertise",
    type: "text",
    placeholder: "Vedic Astrology, Palmistry",
    validation: { required: "Expertise is required" },
  },
  {
    name: "experienceYears" as const,
    label: "Experience (Years)",
    type: "number",
    placeholder: "8",
    validation: { required: "Experience is required" },
  },
  {
    name: "pricePerMinuteChat" as const,
    label: "Chat Price (₹)",
    type: "number",
    placeholder: "15",
    validation: { required: "Chat price is required" },
  },
  {
    name: "pricePerMinuteVoice" as const,
    label: "Voice Price (₹)",
    type: "number",
    placeholder: "25",
    validation: { required: "Voice price is required" },
  },
  {
    name: "pricePerMinuteVideo" as const,
    label: "Video Price (₹)",
    type: "number",
    placeholder: "30",
    validation: { required: "Video price is required" },
  },
  {
    name: "about" as const,
    label: "About",
    type: "textarea",
    placeholder: "Brief description about the astrologer",
    validation: { required: "About is required" },
  },
];

// ------------------ FormField Component ------------------
const FormField = ({
  field,
  register,
  errors,
}: {
  field: (typeof formFields)[number];
  register: UseFormRegister<AstrologerFormData>;
  errors: FieldErrors<AstrologerFormData>;
}) => (
  <div className="space-y-2">
    <Label htmlFor={field.name}>{field.label}</Label>
    {field.type === "textarea" ? (
      <Textarea
        id={field.name}
        placeholder={field.placeholder}
        {...register(field.name, field.validation)}
      />
    ) : (
      <Input
        id={field.name}
        type={field.type}
        placeholder={field.placeholder}
        {...register(field.name, field.validation)}
      />
    )}
    {errors[field.name] && (
      <p className="text-red-500 text-sm">{errors[field.name]?.message}</p>
    )}
  </div>
);

// ------------------ Main Component ------------------
export default function AstrologerFormPage({
  mode = "create",
  astrologerId,
}: {
  mode?: "create" | "edit";
  astrologerId?: string;
}) {
  const dispatch = useAppDispatch();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AstrologerFormData>();

  const watchImage = watch("profileImage");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [watchImage]);

  useEffect(() => {
    const fetchAstrologer = async () => {
      if (mode === "edit" && astrologerId) {
        try {
          const res = await dispatch(getAstrologerById(astrologerId)).unwrap();
          const astro = res.astrologer;

          setValue("name", astro.user?.name || "");
          setValue("mobile", astro.user?.mobile || "");
          setValue("expertise", astro.expertise || "");
          setValue("experienceYears", astro.experienceYears || 0);
          setValue("pricePerMinuteChat", astro.pricePerMinuteChat || 0);
          setValue("pricePerMinuteVoice", astro.pricePerMinuteVoice || 0);
          setValue("pricePerMinuteVideo", astro.pricePerMinuteVideo || 0);
          setValue("about", astro.about || "");
          if (astro.user?.imgUri) {
            setImagePreview(astro.user.imgUri);
          }
        } catch (error) {
          console.error("Failed to fetch astrologer", error);
          showToast.error("Failed to fetch astrologer.");
        }
      }
    };

    fetchAstrologer();
  }, [mode, astrologerId, dispatch, setValue]);

  const handleFormSubmit = async (data: AstrologerFormData) => {
    const astrologerData: AstrologerPayload = {
      name: data.name,
      mobile: data.mobile,
      expertise: data.expertise,
      experienceYears: data.experienceYears,
      pricePerMinuteChat: data.pricePerMinuteChat,
      pricePerMinuteVoice: data.pricePerMinuteVoice,
      pricePerMinuteVideo: data.pricePerMinuteVideo,
      about: data.about,
    };

    const imageFile = data.profileImage?.[0];

    setIsSubmitting(true);
    try {
      if (mode === "edit" && astrologerId) {
        await dispatch(
          editAstrologer({ id: astrologerId, astrologerData, imageFile })
        ).unwrap();
        showToast.success("Astrologer updated successfully!");
      } else {
        await dispatch(
          createAstrologer({ astrologerData, imageFile })
        ).unwrap();
        showToast.success("Astrologer created successfully!");
        reset();
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {mode === "edit" ? "Edit Astrologer" : "Add New Astrologer"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <fieldset disabled={isSubmitting} className="space-y-6">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  register={register}
                  errors={errors}
                />
              ))}

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  {...register("profileImage")}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover mt-2 border"
                  />
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? mode === "edit"
                    ? "Updating..."
                    : "Creating..."
                  : mode === "edit"
                  ? "Update Astrologer"
                  : "Create Astrologer"}
              </Button>
            </fieldset>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}