import { Switch } from "@heroui/react";

export default function Switcher(props: React.ComponentProps<typeof Switch>) {
  return (
    <div className="flex gap-4">
      <Switch {...props} />
    </div>
  );
}
