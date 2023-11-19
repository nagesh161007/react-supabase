import "./Button.css";

export default function Button({
  type,
  onClick,
  children,
  style,
  className,
  ...props
}) {
  const defaultButtonClassName =
    type === "primary" ? "primary-button" : "secondary-button";

  const combinedClassName = `${defaultButtonClassName} ${className || ""}`;

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
