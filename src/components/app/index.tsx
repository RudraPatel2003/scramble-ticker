import { ReactNode } from "react";

import { useAppContext } from "../../context/app-context.ts";
import { unreachable } from "../../utils/unreachable.ts";
import { ScrambleTicker } from "../scramble-ticker/index.tsx";
import { Settings } from "../settings/index.tsx";

export function App(): ReactNode {
  const { screen } = useAppContext();

  switch (screen) {
    case "settings":
      return <Settings />;
    case "scramble":
      return <ScrambleTicker />;
    default:
      unreachable(screen);
  }
}
