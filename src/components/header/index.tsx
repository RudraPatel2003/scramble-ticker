import { ReactNode } from "react";

import { IconButton } from "../icon-button/index.tsx";
import { CloseIcon } from "../icons/close-icon.tsx";

type HeaderProps = {
  children?: ReactNode;
  title: string;
};

export function Header({ children, title }: HeaderProps): ReactNode {
  return (
    <header className="flex items-center justify-between gap-4 px-6 select-none drag">
      <h1 className="text-xs font-medium tracking-widest text-primary/60 uppercase">{title}</h1>

      <div className="flex items-center gap-2 no-drag">
        {children}

        <IconButton onClick={() => window.api.closeWindow()}>
          <CloseIcon className="size-4" />
        </IconButton>
      </div>
    </header>
  );
}
