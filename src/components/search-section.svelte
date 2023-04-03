<script lang="ts">
    import type { Pokemon } from "../lib/types";
    import { pokemonTypes } from "../lib/pokemon-type";
    import Card from "./card.svelte";
    import Filter from "./icons/filter.svelte";

    import { flip } from "svelte/animate";
    import { fade, slide } from "svelte/transition";
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

        const nameMatch = pokemon.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

        return tagsMatch && nameMatch;
    });

    function filter(tag: string) {
        if (tag === "") {
            filterTags = [];
            return;
        }

        // if (!filterTags.includes(tag)) {
        //     filterTags = [...filterTags, tag];
        // } else {
        //     if (filterTags.length === 1) {
        //         filterTags = [];
        //     }
        //     filterTags = filterTags.filter((fTag) => fTag !== tag);
        // }
    }

    function changeFilterState() {
        showFilter = !showFilter;
    }
</script>

<div class="flex flex-col items-center gap-2 mb-4 ">
    <!-- Search Component -->
    <div class="flex items-center w-full">
        <div class="flex flex-row-reverse items-center flex-grow">
            <input
                id="search"
                placeholder="Search using name. Example - pikachu"
                class="flex-grow p-2 text-white transition-all duration-75 ease-linear outline-none md:flex-grow focus:flex-grow bg-neutral-800 peer placeholder:italic focus:bg-neutral-700"
                bind:value={searchText}
            />
            <label
                for="search"
                class="p-1 transition-transform bg-neutral-800 peer-focus:scale-110 peer-focus:outline peer-focus:outline-1 peer-focus:outline-neutral-700"
            >
                <Search width={32} height={32} />
            </label>
        </div>

        <button
            class="p-1 bg-neutral-800 hover:bg-neutral-700"
            on:click={changeFilterState}
        >
            <Filter width={32} height={32} />
        </button>
    </div>

    <!-- If ShowFilter is true, it shows all the filter tags -->
    {#if showFilter}
        <ul transition:slide|local class="flex flex-wrap gap-2">
            {#each pokemonTypes as type}
                <li>
                    <input
                        type="checkbox"
                        bind:group={filterTags}
                        id={type}
                        name={type}
                        value={type}
                        class="sr-only peer"
                    />
                    <label
                        for={type}
                        class="flex gap-2 p-2 font-mono text-black uppercase transition-colors duration-150 ease-in-out bg-white rounded-md cursor-pointer outline outline-2 outline-black hover:bg-neutral-700 hover:text-white peer-checked:bg-neutral-900 peer-checked:text-white peer-checked:outline-white peer-checked:font-bold"
                    >
                        <img
                            src={`${
                                import.meta.env.BASE_URL
                            }/images/icons/${type}.png`}
                            alt={type}
                            class="w-6 h-6"
                        />
                        {type}
                    </label>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<div class="grid grid-cols-2 gap-4 md:gap-2 md:grid-cols-4">
    {#each filteredPokemons as pokemon, index (pokemon.name)}
        <div animate:flip={{ duration: 250, delay: 5 * index }}>
            <Card {pokemon} />
        </div>
    {/each}
</div>
