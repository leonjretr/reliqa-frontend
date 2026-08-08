import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-svh flex-1 items-center justify-center px-4 py-12">{children}</div>
  );
};

export default AuthLayout;
