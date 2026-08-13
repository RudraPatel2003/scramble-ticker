import { ReactNode } from "react";

import { IconProps } from "./icon-properties.ts";

export function PauseIcon({ className }: IconProps): ReactNode {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="16" rx="1" width="4" x="6" y="4" />
      <rect height="16" rx="1" width="4" x="14" y="4" />
    </svg>
  );
}
