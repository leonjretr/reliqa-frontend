import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/lib/shadcn/card";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export const AuthCard = ({ title, description, children, footer }: Props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
      <CardFooter className="text-muted-foreground justify-center">{footer}</CardFooter>
    </Card>
  );
};
