import { writableTree, Refuse, into, isPresent } from "svelte-store-tree";
import type { TreePane } from "./types";

export const tree = writableTree<TreePane>({
  splitDirection: "vertical",
  value: "First",
  focused: true,
  children: [],
  parent: undefined,
});

tree.subscribe((v) => {
  console.log("TREE");
  console.log(v);
});
