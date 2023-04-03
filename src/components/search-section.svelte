<script lang="ts">
    import type { Pokemon } from "../lib/types";
    import { pokemonTypes } from "../lib/pokemon-type";
    import Card from "./card.svelte";
    import Filter from "./icons/filter.svelte";

    import { flip } from "svelte/animate";
    import { slide } from "svelte/transition";
    import Search from "./icons/search.svelte";
    import SearchBox from "./search-box.svelte";
    import FilterMenu from "./filter-menu.svelte";
    import Pagination from "./pagination.svelte";

    export let pokemons: Pokemon[];

    let searchText: string = "";
    let filteredPokemons: Pokemon[] = pokemons;
    let filterTags: string[] = [];
    let showFilter: boolean = false;
    let timer: number;

    $: filteredPokemons = pokemons.filter((pokemon) => {
        const tagsMatch = filterTags.every((tag) =>
            pokemon.types.some((type) => type.type.name === tag)
        );

        const nameMatch = pokemon.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

        return tagsMatch && nameMatch;
    });

    function debounce(value: string) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            searchText = value;
        }, 200);
    }

    function filter(tag: string) {
        if (tag === "") {
            filterTags = [];
            return;
        }
    }

    function changeFilterState() {
        showFilter = !showFilter;
    }
</script>

<div class="flex flex-col items-center gap-2 mb-4 ">
    <!-- Search Component -->
    <div class="flex items-center w-full">
        <SearchBox bind:value={searchText} />
        <button
            class="p-1 bg-neutral-800 hover:bg-neutral-700"
            on:click={changeFilterState}
        >
            <Filter width={32} height={32} />
        </button>
    </div>

    <!-- If ShowFilter is true, it shows all the filter tags -->
    {#if showFilter}
        <FilterMenu bind:tags={filterTags} />
    {/if}
</div>

<!-- <div class="grid grid-cols-2 gap-4 md:gap-2 md:grid-cols-4">
    {#each filteredPokemons as pokemon, index (pokemon.name)}
        <div animate:flip={{ duration: 250 }}>
            <Card {pokemon} />
        </div>
    {/each}
</div> -->
<Pagination
    items={pokemons}
    bind:tags={filterTags}
    bind:search={searchText}
    pageSize={50}
/>
