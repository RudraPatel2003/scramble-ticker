import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";

import { EVENTS } from "../../constants/events.ts";
import { useAppContext } from "../../context/app-context.ts";
import {
  MAXIMUM_INTERVAL_SECONDS,
  MINIMUM_INTERVAL_SECONDS,
  Settings as SettingsValues,
  settingsSchema,
} from "../../hooks/use-settings.ts";
import { Header } from "../header/index.tsx";
import { IconButton } from "../icon-button/index.tsx";
import { BackIcon } from "../icons/back-icon.tsx";

const ROW_CLASS_NAME = "flex items-center justify-between gap-4";

const LABEL_CLASS_NAME = "text-xs tracking-wide text-primary/70";

const FIELD_CLASS_NAME =
  "rounded-md bg-white/10 px-2 py-2 text-xs text-emphasis outline-none focus:bg-white/20";

const ERROR_CLASS_NAME = "text-xs text-red-400";

const ACTION_CLASS_NAME = "cursor-pointer rounded-md px-4 py-2 text-xs transition-colors";

export function Settings(): ReactNode {
  const { settings, setScreen, updateSettings } = useAppContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SettingsValues>({
    defaultValues: settings,
    resolver: zodResolver(settingsSchema),
  });

  function save(values: SettingsValues): void {
    updateSettings(values);

    setScreen("scramble");
  }

  return (
    <form className="flex h-full flex-col bg-surface" onSubmit={handleSubmit(save)}>
      <Header title="Settings">
        <IconButton onClick={() => setScreen("scramble")}>
          <BackIcon className="size-4" />
        </IconButton>
      </Header>

      <div className="flex grow flex-col gap-4 px-6 pb-4">
        <label className={ROW_CLASS_NAME}>
          <span className={LABEL_CLASS_NAME}>Event</span>

          <select className={FIELD_CLASS_NAME} {...register("eventId")}>
            {Object.entries(EVENTS).map(([name, id]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-2">
          <label className={ROW_CLASS_NAME}>
            <span className={LABEL_CLASS_NAME}>Interval</span>

            <span className="flex items-center gap-2">
              <input
                className={`${FIELD_CLASS_NAME} w-16 text-right tabular-nums`}
                max={MAXIMUM_INTERVAL_SECONDS}
                min={MINIMUM_INTERVAL_SECONDS}
                type="number"
                {...register("intervalSeconds", { valueAsNumber: true })}
              />

              <span className={LABEL_CLASS_NAME}>seconds</span>
            </span>
          </label>

          {errors.intervalSeconds && (
            <p className={ERROR_CLASS_NAME}>{errors.intervalSeconds.message}</p>
          )}
        </div>

        <label className={ROW_CLASS_NAME}>
          <span className={LABEL_CLASS_NAME}>Always on top</span>

          <input
            className="size-4 cursor-pointer accent-primary"
            type="checkbox"
            {...register("alwaysOnTop")}
          />
        </label>

        <div className="mt-auto flex justify-end gap-2">
          <button
            className={`${ACTION_CLASS_NAME} text-primary hover:bg-white/10 hover:text-emphasis`}
            onClick={() => setScreen("scramble")}
            type="button"
          >
            Cancel
          </button>

          <button
            className={`${ACTION_CLASS_NAME} bg-white/10 text-emphasis hover:bg-white/20`}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
