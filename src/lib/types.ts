export type TreePane = {
  splitDirection: "vertical" | "horizontal";
  value: string;
  parent: TreePane | undefined;
  children: TreePane[];
  focused: boolean;
};

export type SplitDirection = "vertical" | "horizontal";

export type RootNode = {
  splitDirection: SplitDirection;
  leftNode?: RootNode | ValueNode;
  rightNode?: RootNode | ValueNode;
};

export type ValueNode = {
  value: string;
};

export type StoreRootNode = {
  splitDirection: SplitDirection;
  leftNode: string;
  rightNode: string;
};

export type StoreValueNode = {
  focused: boolean;
  value: string;
};
