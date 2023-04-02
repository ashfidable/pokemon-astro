<script lang="ts">
    import type { Pokemon } from "../lib/types";
    import Card from "./card.svelte";
    import { flip } from "svelte/animate";

    export let pokemons: Pokemon[];

    let searchText: string = "";
    let filteredPokemons: Pokemon[] = pokemons;
    let filterTags: string[] = [];

    $: {
        if (searchText) {
            filteredPokemons = pokemons.filter((pokemon) =>
                pokemon.name.includes(searchText.toLowerCase())
            );
        } else {
            filteredPokemons = pokemons;
        }
    }

    function filter(type: string) {
        // if (!filterTags.includes(type)) {
        //     filterTags = [...filterTags, type];
        //     filteredPokemons = filteredPokemons.filter((pokemon) => {
        //         for (var i = 0; i < filterTags.length; i++){
        //         }
        //     });
        // }
    }
</script>

<div class="flex items-center mb-4">
    <div class="flex items-center w-full">
        <input
            placeholder="Search using name. Example - pikachu"
            class="flex-grow md:flex-grow-[0.3] outline-none focus:flex-grow p-2 text-white rounded-md bg-neutral-800 transition-all duration-75 ease-linear peer placeholder:italic"
            bind:value={searchText}
        />
    </div>

    <!-- <div class="flex">
        <button
            class="p-2 text-black bg-white rounded-md"
            on:click={() => filter("grass")}>Grass</button
        >
        <button
            class="p-2 text-black bg-white rounded-md"
            on:click={() => filter("poison")}>Poison</button
        >
        {filterTags}
    </div> -->
</div>

<div class="grid grid-cols-2 gap-4 md:gap-2 md:grid-cols-4">
    {#each filteredPokemons as pokemon, index (pokemon.name)}
        <div animate:flip={{ duration: 250, delay: 5 * index }}>
            <Card {pokemon} />
        </div>
    {/each}
</div>
