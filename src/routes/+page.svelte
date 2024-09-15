<script lang="ts">
  import { onMount } from "svelte";
  import * as Command from "$lib/components/ui/command";
  import Pane from "$lib/components/pane.svelte";

  let open = false;
  let value: string | undefined = undefined;

  let commandRoot: Command.Dialog;

  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          open = !open;
        }

        if (open) {
          switch (e.key) {
            case "v":
            case "V":
              e.preventDefault();
              open = false;
              console.log("Split");
              break;
          }
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

  const paneTree = {
    splitDirection: "horizontal",
    value: "Hello",
    child: {
      splitDirection: "vertical",
      value: "World",
      child: {
        splitDirection: "horizontal",
        value: "!!",
      },
    },
  };
</script>

<!-- <p class="text-muted-foreground text-sm">
  Press
  <kbd
    class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
  >
    <span class="text-xs">⌘</span>K
  </kbd>
</p> -->

<Pane pane={paneTree}></Pane>

<Command.Dialog bind:open bind:value>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List bind:this={commandRoot}>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Pane Options">
      <Command.Item>
        <span>Split Vertically</span>
        <Command.Shortcut>⌘V</Command.Shortcut>
      </Command.Item>
      <Command.Item>Split Horizontally</Command.Item>
      <Command.Item>Close</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
