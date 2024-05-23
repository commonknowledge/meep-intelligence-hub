"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-meepGray-700 group-[.toaster]:text-white group-[.toaster]:border-meepGray-600 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-meepGray-400",
          actionButton:
            "group-[.toast]:bg-brandBlue group-[.toast]:text-slate-900",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-slate-900",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
