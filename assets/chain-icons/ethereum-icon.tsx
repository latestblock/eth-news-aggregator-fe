const EthereumIcon = ({
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
    height={height}
    width={width}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 1.75L5.75 12.25L12 16L18.25 12.25L12 1.75Z" fill="#627EEA" />
    <path d="M12 16L5.75 12.25L12 22.25L18.25 12.25L12 16Z" fill="#627EEA" />
    <path d="M12 16V1.75L18.25 12.25L12 16Z" fillOpacity="0.8" fill="#627EEA" />
    <path
      d="M12 1.75V16L5.75 12.25L12 1.75Z"
      fillOpacity="0.6"
      fill="#627EEA"
    />
    <path
      d="M12 16V22.25L18.25 12.25L12 16Z"
      fillOpacity="0.6"
      fill="#627EEA"
    />
    <path
      d="M12 22.25V16L5.75 12.25L12 22.25Z"
      fillOpacity="0.2"
      fill="#627EEA"
    />
  </svg>
);

export default EthereumIcon;
