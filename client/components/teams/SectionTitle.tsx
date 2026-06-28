import { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="text-2xl font-bold tracking-tight">{children}</h2>;
}
