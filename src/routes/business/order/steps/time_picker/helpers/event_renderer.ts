import type { EventRenderedArgs } from "@syncfusion/ej2-schedule";

export function applyCategoryColor(args: EventRenderedArgs): void {
  if (!args.element) {
    return;
  }
  console.log(
    "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );
  args.element.style.backgroundColor = "red";
  args.element.style.color = "yellow";
}
