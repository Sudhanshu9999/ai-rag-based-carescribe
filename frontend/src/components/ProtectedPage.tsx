"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // While checking authorization, you might want to show a loading state
  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Checking authorization...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedPage;
