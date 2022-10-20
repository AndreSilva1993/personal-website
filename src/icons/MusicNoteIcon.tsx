interface MusicNoteIconProps {
  className?: string;
  onClick?: () => void;
}

export function MusicNoteIcon(props: MusicNoteIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
    </svg>
  );
}
