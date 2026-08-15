import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import { EVENTS } from "../../constants/events.ts";
import { useAppContext } from "../../context/app-context.ts";
import {
  MAXIMUM_INTERVAL_SECONDS,
  MINIMUM_INTERVAL_SECONDS,
  Settings as SettingsValues,
  settingsSchema,
} from "../../types/settings.ts";
import { Button } from "../ui/button.tsx";
import { Label } from "../ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx";
import { Separator } from "../ui/separator.tsx";
import { Slider } from "../ui/slider.tsx";
import { Switch } from "../ui/switch.tsx";

export function Settings(): ReactNode {
  const { settings, updateSettings } = useAppContext();

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const onSubmit = handleSubmit((values) => {
    updateSettings(values);

    reset({ ...values });
  });

  return (
    <form className="flex h-full flex-col gap-6 bg-background p-6" onSubmit={onSubmit}>
      <header className="flex flex-col gap-2">
        <h1 className="text-base font-semibold">General</h1>

        <p className="text-xs text-muted-foreground">Choose how the ticker sits on your desk.</p>
      </header>

      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4">
        <Controller
          control={control}
          name="eventId"
          render={({ field }) => (
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="event">Event</Label>

                <p className="text-xs text-muted-foreground">Which puzzle to scramble.</p>
              </div>

              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-32" id="event">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent position="popper">
                  {Object.entries(EVENTS).map(([name, id]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <Separator />

        <Controller
          control={control}
          name="intervalSeconds"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="interval">Interval</Label>

                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {field.value}s
                </span>
              </div>

              <p className="text-xs text-muted-foreground">How often a new scramble appears.</p>

              <Slider
                id="interval"
                max={MAXIMUM_INTERVAL_SECONDS}
                min={MINIMUM_INTERVAL_SECONDS}
                onBlur={field.onBlur}
                onValueChange={([value]) => field.onChange(value)}
                step={1}
                value={[field.value]}
              />
            </div>
          )}
        />

        <Separator />

        <Controller
          control={control}
          name="alwaysOnTop"
          render={({ field }) => (
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="always-on-top">Always on top</Label>

                <p className="text-xs text-muted-foreground">
                  Keep the ticker floating above your other windows.
                </p>
              </div>

              <Switch
                checked={field.value}
                id="always-on-top"
                onBlur={field.onBlur}
                onCheckedChange={field.onChange}
                ref={field.ref}
              />
            </div>
          )}
        />
      </div>

      <footer className="mt-auto flex justify-end gap-2">
        <Button
          onClick={() => window.api.closeSettings()}
          size="lg"
          type="button"
          variant="secondary"
        >
          Close
        </Button>

        <Button disabled={!isDirty} size="lg" type="submit">
          Save
        </Button>
      </footer>
    </form>
  );
}
