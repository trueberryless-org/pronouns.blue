export function HeartIcon({
  filled,
  className = "",
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.5C11.7 20.5 11.4 20.4 11.2 20.2L4.2 13.8C2.2 12 2 8.9 3.8 6.9C5.6 4.9 8.7 4.7 10.7 6.5L12 7.7L13.3 6.5C15.3 4.7 18.4 4.9 20.2 6.9C22 8.9 21.8 12 19.8 13.8L12.8 20.2C12.6 20.4 12.3 20.5 12 20.5Z" />
    </svg>
  );
}
