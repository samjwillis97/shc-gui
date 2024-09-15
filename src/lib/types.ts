export type PaneTree = {
  splitDirection: "vertical" | "horizontal";
  value: string;
  child: PaneTree | undefined;
};
