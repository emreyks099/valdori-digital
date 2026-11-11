import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 11 11 3M4.5 3H11v6.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

type Variant = "primary" | "ghost" | "dark";

const variantClass: Record<Variant, string> = {
  primary: "btn",
  ghost: "btn btn-ghost",
  dark: "btn btn-dark",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${variantClass[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      <span className="btn-chip">
        <ArrowIcon />
      </span>
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ children, variant = "primary", className = "", ...rest }: ButtonProps) {
  return (
    <button className={`${variantClass[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      <span className="btn-chip">
        <ArrowIcon />
      </span>
    </button>
  );
}

/** Metin içi ok bağlantısı */
export function TextLink({
  href,
  children,
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="link-line">{children}</span>
      <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  const cls = `group inline-flex items-center gap-2 t-sign text-bone ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
