export default function Heading({
  variant,
  children,
}: {
  variant: "h1" | "h2";
  children: React.ReactNode;
}) {
  if (variant === "h1") {
    return <h1 className="text-3xl font-bold">{children}</h1>;
  }
  if (variant === "h2") {
    return (
      <h2 className="mb-7 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
        {children}
      </h2>
    );
  }
}
