import Image from "next/image";
import AuthForm from "./auth/AuthForm";
import LoginForm from "./auth/LoginForm";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthForm />
      <LoginForm />
    </main>
  );
}
