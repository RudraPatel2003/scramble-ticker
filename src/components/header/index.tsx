import { XIcon } from "lucide-react";
import { ReactNode } from "react";

import { Button } from "../ui/button.tsx";

type HeaderProps = {
  children: ReactNode;
  title: string;
};

export function Header({ children, title }: HeaderProps): ReactNode {
  return (
    <header className="flex items-center justify-between gap-4 select-none drag">
      <h1 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {title}
      </h1>

      <div className="flex items-center gap-1 no-drag">
        {children}

        <Button onClick={() => window.api.closeWindow()} size="icon-sm" variant="ghost">
          <XIcon />
        </Button>
      </div>
    </header>
  );
}
