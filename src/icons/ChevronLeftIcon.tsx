interface ChevronLeftIconProps {
  className?: string;
  onClick?: () => void;
}

export function ChevronLeftIcon(props: ChevronLeftIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
    </svg>
  );
}
