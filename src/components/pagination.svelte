<script>
    import Card from "./card.svelte";
    import { flip } from "svelte/animate";

    export let items = [];
    export let tags = [];
    export let pageSize = 10;
    export let search = "";

    let totalPages = Math.ceil(items.length / pageSize);
    let currentPage = 1;
    let results;

    function handlePageChange(newPage) {
        currentPage = newPage;
    }

    $: {
        results = items.filter((item) => {
            const tagsMatch = tags.every((tag) =>
                item.types.some((t) => t.type.name === tag)
            );

            const nameMatch = item.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matched = nameMatch && tagsMatch;
            return matched;
        });

        totalPages = Math.ceil(results.length / pageSize);

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        results = results.slice(startIndex, endIndex);

        if (results.length === 0) {
            currentPage = 1;
        }
    }
</script>

<div class="space-y-4">
    <div class="flex gap-4">
        {#if currentPage > 1}
            <button
                class="p-2 font-mono font-bold text-black rounded-lg"
                on:click={() => handlePageChange(currentPage - 1)}
            >
                Previous
            </button>
        {/if}

        {#if currentPage < totalPages}
            <button
                class="p-2 font-mono font-bold text-black rounded-lg"
                on:click={() => handlePageChange(currentPage + 1)}
            >
                Next
            </button>
        {/if}
    </div>

    <div class="grid grid-cols-2 gap-4 md:gap-2 md:grid-cols-4">
        {#each results as item, index (item.name)}
            <div animate:flip={{ duration: 100 }}>
                <Card pokemon={item} />
            </div>
        {/each}
    </div>
</div>

<style>
    button {
        background: linear-gradient(
            to right,
            rgb(96, 165, 250),
            rgb(52, 211, 153)
        );
        background-size: 150%;
    }

    button:hover {
        animation: gradient 2s ease infinite forwards;
    }
</style>
