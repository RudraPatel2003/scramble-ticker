import { ReactNode } from "react";

import { ScrambleProvider } from "../../context/scramble-provider.tsx";
import { ScrambleTicker } from "../scramble-ticker/index.tsx";
import { Settings } from "../settings/index.tsx";

export function App(): ReactNode {
  const isSettingsWindow = window.location.hash === "#settings";

  if (isSettingsWindow) {
    return <Settings />;
  }

  return (
    <ScrambleProvider>
      <ScrambleTicker />
    </ScrambleProvider>
  );
}
