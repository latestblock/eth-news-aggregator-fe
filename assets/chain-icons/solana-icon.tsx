const SolanaIcon = ({
  className,
  height = 24,
  width = 24,
}: {
  className?: string;
  height?: number;
  width?: number;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    height={height}
    width={width}
  >
    <path
      d="M17.52 9.6C17.4 9.48 17.24 9.4 17.08 9.4H4.92C4.6 9.4 4.44 9.76 4.68 9.96L6.48 11.6C6.6 11.72 6.76 11.8 6.92 11.8H19.08C19.4 11.8 19.56 11.44 19.32 11.24L17.52 9.6Z"
      fill="#9945FF"
    />
    <path
      d="M6.48 12.4C6.36 12.28 6.2 12.2 6.04 12.2H18.2C18.52 12.2 18.68 12.56 18.44 12.76L16.64 14.4C16.52 14.52 16.36 14.6 16.2 14.6H4.04C3.72 14.6 3.56 14.24 3.8 14.04L6.48 12.4Z"
      fill="#9945FF"
    />
    <path
      d="M16.64 6.8C16.52 6.68 16.36 6.6 16.2 6.6H4.04C3.72 6.6 3.56 6.96 3.8 7.16L5.6 8.8C5.72 8.92 5.88 9.0 6.04 9.0H18.2C18.52 9.0 18.68 8.64 18.44 8.44L16.64 6.8Z"
      fill="#9945FF"
    />
  </svg>
);

export default SolanaIcon;
