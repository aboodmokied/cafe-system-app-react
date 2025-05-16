import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrors(["الرجاء إدخال البريد الإلكتروني وكلمة المرور"]);
      return;
    }
    setErrors([]);

    try {
      const { user } = await login(email, password);
      setEmail("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (error: any) {
      if (error.response?.status === 400) {
        const message = error.response.data?.message;
        if (Array.isArray(message)) {
          setErrors(message);
        } else if (typeof message === "string") {
          setErrors([message]);
        } else {
          setErrors(["حدث خطأ غير متوقع"]);
        }
      } else {
        console.error("خطأ غير متوقع:", error);
        setErrors(["حدث خطأ في الاتصال بالخادم"]);
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
      <div
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <div className="w-full max-w-md p-8 border rounded shadow-lg bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-semibold">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.length > 0 && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded space-y-1 text-sm">
              {errors.map((err, i) => (
                <p key={i}>• {err}</p>
              ))}
            </div>
          )}

          <Button onClick={handleLogin} className="w-full">
            تسجيل الدخول
          </Button>
        </div>
      </div>
  );
};

export default LoginPage;
