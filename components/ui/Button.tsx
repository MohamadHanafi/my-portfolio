import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "filled" | "outlined";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: ButtonVariant;
};

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold transition";

const variantClasses: Record<ButtonVariant, string> = {
  filled: "bg-primary text-white shadow-sm hover:opacity-90",
  outlined:
    "border border-zinc-200 bg-white text-foreground shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-900",
};

export default function Button({
  children,
  className = "",
  href,
  icon,
  iconPosition = "left",
  variant = "filled",
  ...props
}: ButtonProps | ButtonLinkProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const content = (
    <>
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
