import type { TreePane } from "./types";

let focusedPane: TreePane | undefined = undefined;

export const setFocusedPane = (pane: TreePane) => {
  console.log(`Setting focus to ${pane.value}`);

  if (focusedPane) {
    focusedPane.focused = false;
  }

  pane.focused = true;
  focusedPane = pane;
};

export const getFocusedPane = () => {
  if (!focusedPane) throw new Error("Unable to get focused pane");
  return focusedPane;
};
