import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SignUpFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function SignUpForm() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, isLoading } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Tên đăng nhập không được để trống";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signUp(formData.email, formData.password);
      toast({
        title: "Đăng ký thành công!",
        description: "Vui lòng đăng nhập để tiếp tục.",
        variant: "default",
      });
      navigate("/sign-in");
    } catch (error) {
      toast({
        title: "Đăng ký thất bại!",
        description:
          error instanceof Error ? error.message : "Đã có lỗi xảy ra",
        variant: "destructive",
      });
    }
  };


  const updateFormData = (field: keyof SignUpFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Tên đăng nhập"
            value={formData.username}
            onChange={(e) => updateFormData("username")(e.target.value)}
            className="rounded-full px-6 py-[18px]"
          />
          {errors.username && (
            <p className="text-sm text-red-500 px-6">{errors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Địa chỉ Email"
            value={formData.email}
            onChange={(e) => updateFormData("email")(e.target.value)}
            className="rounded-full px-6 py-[18px]"
          />
          {errors.email && (
            <p className="text-sm text-red-500 px-6">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="tel"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={(e) => updateFormData("phone")(e.target.value)}
            className="rounded-full px-6 py-[18px]"
          />
          {errors.phone && (
            <p className="text-sm text-red-500 px-6">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <PasswordInput
            value={formData.password}
            onChange={updateFormData("password")}
            placeholder="Mật khẩu"
          />
          {errors.password && (
            <p className="text-sm text-red-500 px-6">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <PasswordInput
            value={formData.confirmPassword}
            onChange={updateFormData("confirmPassword")}
            placeholder="Nhập lại mật khẩu"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 px-6">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-full py-[18px] h-auto bg-secondary text-white hover:bg-white hover:text-secondary font-bold border-transparent hover:border-secondary"
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng ký..." : "Đăng ký ngay"}
        </Button>
      </form>
    </div>
  );
}
