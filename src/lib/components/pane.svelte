<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable";
    import { setFocusedPane } from "$lib/pane";
    import type { TreePane} from "$lib/types";

    export let pane: TreePane | undefined = undefined;

    const getDirection = () =>
        pane?.splitDirection === "vertical" ? "horizontal" : "vertical";

    const getDefaultSize = () =>
        pane?.children && pane?.children.length > 0 ? 50 : 100;

    const handleClick = () => {
        if (!pane) throw new Error("Missing pane");
        setFocusedPane(pane);
        pane = pane;
    };

    console.log(pane);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if pane !== undefined}
    <Resizable.PaneGroup direction={getDirection()} class="max-w min-h-screen">
        <Resizable.Pane defaultSize={getDefaultSize()}>
            <div
                on:click={() => handleClick()}
                class={(pane.focused ? "border-2 border-red-500" : "") +
                    " w-full h-full"}
            >
                {pane.value}
            </div>
        </Resizable.Pane>
        {#if pane.children.length > 0}
            {#each pane.children as child}
                <Resizable.Handle />
                <Resizable.Pane defaultSize={getDefaultSize()}>
                    <svelte:self pane={child}></svelte:self>
                </Resizable.Pane>
            {/each}
        {/if}
        <!--
    {#if pane.child !== undefined}
      <Resizable.Handle withHandle />
      <Resizable.Pane defaultSize={50} minSize={10}>
        <svelte:self pane={pane.child}></svelte:self>
      </Resizable.Pane>
    {/if}
    -->
    </Resizable.PaneGroup>
{/if}
