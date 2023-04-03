<script lang="ts">
    import type { Pokemon } from "../lib/types";
    import { pokemonTypes } from "../lib/pokemon-type";
    import Card from "./card.svelte";
    import Filter from "./icons/filter.svelte";

    import { flip } from "svelte/animate";
    import { fade, slide } from "svelte/transition";
    import { linear } from "svelte/easing";
    import Search from "./icons/search.svelte";

    export let pokemons: Pokemon[];

    let searchText: string = "";
    let filteredPokemons: Pokemon[] = pokemons;
    let filterTags: string[] = [];
    let showFilter: boolean = false;

    $: filteredPokemons = pokemons.filter((pokemon) => {
        const tagsMatch = filterTags.every((tag) =>
            pokemon.types.some((type) => type.type.name === tag)
        );

        const nameMatch = pokemon.name.toLowerCase().includes(searchText);

        return tagsMatch && nameMatch;
    });

    function filter(tag: string) {
        if (tag === "") {
            filterTags = [];
            searchText = "";
            return;
        }

        if (!filterTags.includes(tag)) {
            filterTags = [...filterTags, tag];
        } else {
            if (filterTags.length === 1) {
                filterTags = [];
            }
            filterTags = filterTags.filter((fTag) => fTag !== tag);
        }
    }

    function changeFilterState() {
        showFilter = !showFilter;
    }
</script>

<div class="flex flex-col items-center gap-2 mb-4 ">
    <div class="flex items-center w-full justify-between">
        <!-- <Search width={32} height={32} /> -->
        <input
            placeholder="Search using name. Example - pikachu"
            class="flex-grow md:flex-grow-[0.3] outline-none focus:flex-grow p-2 text-white  bg-neutral-800 transition-all duration-75 ease-linear peer placeholder:italic "
            bind:value={searchText}
        />

        <button
            class="bg-neutral-800 hover:bg-neutral-700 p-1"
            on:click={changeFilterState}
        >
            <Filter width={32} height={32} />
        </button>
    </div>

    {#if showFilter}
        <div
            transition:slide|local={{ easing: linear, duration: 150 }}
            class="grid grid-flow-col gap-2 grid-rows-3"
        >
            <button
                class="p-2 text-black bg-white rounded-md hover:bg-neutral-900 hover:text-white transition-colors duration-150 ease-in-out"
                transition:fade
                on:click={() => filter("")}>ALL</button
            >
            {#each pokemonTypes as type}
                <button
                    class="p-2 flex  gap-2 text-black bg-white rounded-md hover:bg-neutral-900 hover:text-white transition-colors duration-150 ease-in-out"
                    transition:fade
                    on:click={() => filter(type)}
                >
                    <img
                        src={`${
                            import.meta.env.BASE_URL
                        }/images/icons/${type}.png`}
                        alt={type}
                        class="w-6 h-6"
                    />
                    <span>{type}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<div class="grid grid-cols-2 gap-4 md:gap-2 md:grid-cols-4">
    {#each filteredPokemons as pokemon, index (pokemon.name)}
        <div animate:flip={{ duration: 250, delay: 5 * index }}>
            <Card {pokemon} />
        </div>
    {/each}
</div>
