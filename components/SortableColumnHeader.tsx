import { cn } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SortableColumnHeader({
  children, sortDirection,
}: { children: React.ReactNode; sortDirection?: "ascending" | "descending" }) {
  return (
    <span className="flex items-center justify-between gap-2">
      {children}
      {!!sortDirection && (
        <Icon
          icon="gravity-ui:chevron-up"
          className={cn(
            "size-3 transform transition-transform duration-100 ease-out text-[#d99934]",
            sortDirection === "descending" ? "rotate-180" : "",
          )}
        />
      )}
    </span>
  );
}
