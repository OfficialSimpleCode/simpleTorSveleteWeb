import type { EventRenderedArgs } from "@syncfusion/ej2-schedule";

export function applyCategoryColor(args: EventRenderedArgs): void {
  if (!args.element) {
    return;
  }

  args.element.style.backgroundColor = "blue";
}
