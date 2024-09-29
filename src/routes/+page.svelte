<script lang="ts">
    import { onMount } from "svelte";
    import * as Command from "$lib/components/ui/command";
    import type { TreePane } from "$lib/types";
    import Pane from "$lib/components/pane.svelte";
    import { setFocusedPane, getFocusedPane } from "$lib/pane";
    import { nanoid } from "nanoid/non-secure";
    import { addNode, getNode, logNodeStores, splitNode } from "$lib/nodeStore";
    import Panev2 from "$lib/components/panev2.svelte";

    let open = false;
    let value: string | undefined = undefined;

    // I think a pane only gets a new child when the split
    // direction changes, the pane belongs to the parent
    // just make sure to insert the split at the right place
    let paneTree: TreePane = {
        splitDirection: "vertical",
        value: "Hello",
        parent: undefined,
        children: [],
        focused: true,
    };

    const rootNodeId = nanoid();
    const rootNode = {
      value: "ID 1",
      focused: true,
      splitDirection: "vertical" as const
    }
    const rootNodeStore = addNode(rootNodeId, rootNode)
    rootNodeStore.subscribe((v) => {
      console.log("Root node updated");
      console.log(v)
    });

    const nodeIds1 = splitNode(rootNodeId, "ID 2", "vertical");
    const nodeIds2 = splitNode(nodeIds1.rightNode, "ID 3", "vertical")
    const nodeIds3 = splitNode(nodeIds2.rightNode, "ID 4", "horizontal")
    splitNode(nodeIds3.leftNode, "ID 5", "vertical")

    logNodeStores();

    const handleCommand = (command: string) => {
        switch (command.toLowerCase()) {
            case "split vertically":
                splitFocusedPaneVertically();
                break;
        }
    };

    const splitFocusedPaneVertically = () => {
        const focusedPane = getFocusedPane();
        if (!focusedPane.parent) {
            console.log("Adding Pane to Root Node");
            focusedPane.splitDirection = "vertical";

            const newPane = {
                value: "Created Vertical Split",
                splitDirection: "vertical" as const,
                parent: focusedPane,
                children: [],
                focused: false,
            };

            focusedPane.children.push(newPane);
            setFocusedPane(newPane);
        }

        paneTree = paneTree;
    };

    onMount(() => {
        function handleKeydown(e: KeyboardEvent) {
            if (e.metaKey || e.altKey) {
                if (e.key === "k") {
                    e.preventDefault();
                    open = !open;
                }
            }

            if (open) {
                if (e.metaKey || e.altKey) {
                    switch (e.key) {
                        case "v":
                        case "V":
                            e.preventDefault();
                            open = false;
                            handleCommand("split vertically");
                            break;
                    }
                }

                if (e.key === "Enter") {
                    // IDK How to do this well
                }
            }
        }

        function handleKeyUp(e: KeyboardEvent) {}

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    });
</script>

<!-- <p class="text-muted-foreground text-sm">
  Press
  <kbd
    class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
  >
    <span class="text-xs">⌘</span>K
  </kbd>
</p> -->

<!-- <Pane pane={paneTree}></Pane> -->
<Panev2 nodeId={rootNodeId}></Panev2>

<Command.Dialog bind:open bind:value>
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Pane Options">
            <Command.Item>
                <span>Split Vertically</span>
                <Command.Shortcut>⌘V</Command.Shortcut>
            </Command.Item>
            <Command.Item>
                <span>Split Horizontally</span>
                <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
            <Command.Item>Close</Command.Item>
        </Command.Group>
    </Command.List>
</Command.Dialog>
