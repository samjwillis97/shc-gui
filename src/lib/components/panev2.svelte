<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable";
    import { focusNode, getNode } from "$lib/nodeStore";
    import type { StoreRootNode } from "$lib/types";

    export let nodeId: string;
    const pane = getNode(nodeId);

    const getDirection = (node: StoreRootNode) =>
        node.splitDirection === "vertical" ? "horizontal" : "vertical";

    const getDefaultSize = (node: StoreRootNode) =>
        node.leftNode && node.rightNode ? 50 : 100;

    const handleClick = () => {
      console.log(`Handle Click: ${nodeId}`)
      focusNode(nodeId)
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if $pane}
    {#if "value" in $pane}
        <div
            on:click={() => handleClick()}
            class={($pane.focused ? "border-2 border-red-500" : "") +
                " max-w h-20"}
        >
            {$pane.value}
        </div>
    {:else}
        <Resizable.PaneGroup direction={getDirection($pane)} class="max-w">
            {#if $pane.leftNode}
                <Resizable.Pane defaultSize={getDefaultSize($pane)}>
                    <svelte:self nodeId={$pane.leftNode}></svelte:self>
                </Resizable.Pane>
                <Resizable.Handle />
            {/if}
            {#if $pane.rightNode}
                <Resizable.Pane defaultSize={getDefaultSize($pane)}>
                    <svelte:self nodeId={$pane.rightNode}></svelte:self>
                </Resizable.Pane>
                <Resizable.Handle />
            {/if}
        </Resizable.PaneGroup>
    {/if}
{/if}
