import { ReactNode } from "react";

const CLASS_NAME =
  "cursor-pointer rounded-md p-2 text-primary transition-colors hover:bg-white/10 hover:text-emphasis";

type IconButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export function IconButton({ children, onClick }: IconButtonProps): ReactNode {
  return (
    <button className={CLASS_NAME} onClick={onClick} type="button">
      {children}
    </button>
  );
}
