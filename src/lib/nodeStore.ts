import { get, writable, type Writable } from "svelte/store";
import type { SplitDirection, StoreRootNode, StoreValueNode } from "./types";
import { nanoid } from "nanoid";

const nodeStores: Record<string, Writable<StoreRootNode | StoreValueNode>> = {};
const focusedNode = writable<string>("");

export const focusNode = (id: string) => {
  getNode(get(focusedNode))?.update((v) => {
    if ("focused" in v) {
      v.focused = false;
    }

    return v;
  });

  getNode(id)?.update((v) => {
    if ("focused" in v) {
      v.focused = true;
    }

    return v;
  });

  focusedNode.update(() => id);
};

export const addNode = (id: string, value: StoreValueNode | StoreRootNode) => {
  if (id in nodeStores) {
    throw new Error("Node already exists cannot add");
  }

  const store = writable(value);
  nodeStores[id] = store;
  return store;
};

export const getNode = (id: string) => {
  if (id in nodeStores) {
    return nodeStores[id];
  }

  return null;
};

export const splitNode = (
  id: string,
  newSplit: string,
  direction: SplitDirection,
) => {
  const leftNodeId = nanoid();
  const rightNodeId = nanoid();

  getNode(id)?.update((v) => {
    if ("value" in v) {
      addNode(leftNodeId, {
        focused: false,
        value: v.value,
      });
      addNode(rightNodeId, {
        focused: false,
        value: newSplit,
      });
      focusNode(rightNodeId);

      return {
        splitDirection: direction,
        leftNode: leftNodeId,
        rightNode: rightNodeId,
      };
    }
    return v;
  });

  return {
    rootNode: id,
    leftNode: leftNodeId,
    rightNode: rightNodeId,
  };
};

export const logNodeStores = () => {
  console.log(
    Object.keys(nodeStores).reduce(
      (acc, v) => {
        acc[v] = get(nodeStores[v]);
        return acc;
      },
      {} as { [key: string]: StoreRootNode | StoreValueNode },
    ),
  );
};
