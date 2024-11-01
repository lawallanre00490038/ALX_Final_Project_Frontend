import { ReactNode } from "react";

export const PageHeader = ({ children}: {children: ReactNode}) => {
  return <h1 className="text-2xl lg:text-4xl mb-4">
    {children}
  </h1>
}
