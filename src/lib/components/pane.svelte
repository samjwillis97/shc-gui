<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable";
  import type { PaneTree } from "$lib/types";

  export let pane: PaneTree | undefined = undefined;

  console.log(pane);
</script>

{#if pane !== undefined}
  <Resizable.PaneGroup
    direction={pane.splitDirection}
    class="min-h-screen items-stretch"
  >
    <Resizable.Pane defaultSize={50} minSize={10}>
      <!-- <div class="relative h-full w-full"> -->
      Pane!! {pane.value}
      <!-- </div> -->
    </Resizable.Pane>

    {#if pane.child !== undefined}
      <Resizable.Handle withHandle />
      <Resizable.Pane defaultSize={50} minSize={10}>
        <svelte:self pane={pane.child}></svelte:self>
      </Resizable.Pane>
    {/if}
  </Resizable.PaneGroup>
{/if}
