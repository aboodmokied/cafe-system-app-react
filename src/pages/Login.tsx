import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!username || !password) {
      setError("الرجاء إدخال اسم المستخدم وكلمة المرور");
      return;
    }
    setError(null);
    // هنا يمكنك استدعاء API تسجيل الدخول
    alert(`تم تسجيل الدخول باسم المستخدم: ${username}`);
    // إعادة ضبط الحقول
    setUsername("");
    setPassword("");
  };

  return (
    <Layout>
      <div
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <div className="w-full max-w-md p-8 border rounded shadow-lg bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-semibold">
              اسم المستخدم
            </label>
            <input
              id="username"
              type="text"
              placeholder="أدخل اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          {error && (
            <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
          )}

          <Button onClick={handleLogin} className="w-full">
            تسجيل الدخول
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
