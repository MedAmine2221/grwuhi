/* eslint-disable @next/next/no-img-element */
import { AdviceCardProps } from "@/constants/interfaces";
import { Card } from "@heroui/react";

export function AdviceCard({
  title,
  description,
  tag,
  tagColor = "#d99934",
  imageSrc,
  imageAlt,
  href,
}: AdviceCardProps) {
  return (
    <Card className="w-full items-stretch md:flex-row border-2 border-[#d99934] bg-[#d99934]/10">
      <div className="relative h-35 w-full shrink-0 overflow-hidden rounded-2xl sm:h-full sm:w-36">
        <img
          alt={imageAlt}
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover select-none"
          loading="lazy"
          src={imageSrc}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Card.Header className="gap-1 pb-0">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit"
            style={{ backgroundColor: `${tagColor}25`, color: tagColor }}
          >
            {tag}
          </span>
          <Card.Title className="pr-8 text-base leading-snug">{title}</Card.Title>
          <Card.Description className="text-xs leading-relaxed line-clamp-2">
            {description}
          </Card.Description>
        </Card.Header>

        <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between pt-0">
          <a
            href={href}
            className="inline-flex items-center justify-center w-full sm:w-auto border-2 border-[#113d3c] bg-[#113d3c]/10 text-[#113d3c] rounded-md px-3 py-1 text-sm font-medium"
          >
            {"Read the article"}
          </a>
        </Card.Footer>
      </div>
    </Card>
  );
}