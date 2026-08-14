import { ReactNode } from "react";

import { IconProps } from "./icon-props.ts";

export function PlayIcon({ className }: IconProps): ReactNode {
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
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
