<script lang="ts">
    import type { Pokemon } from "../lib/types";
    import Dark from "./icons/dark.svelte";
    import Electric from "./icons/electric.svelte";
    import Fairy from "./icons/fairy.svelte";
    import Fighting from "./icons/fighting.svelte";
    import Ground from "./icons/ground.svelte";
    import Ice from "./icons/ice.svelte";
    import Normal from "./icons/normal.svelte";
    import Poison from "./icons/poison.svelte";
    import Psychic from "./icons/psychic.svelte";
    import Rock from "./icons/rock.svelte";
    import Steel from "./icons/steel.svelte";
    import Water from "./icons/water.svelte";
    export let pokemon: Pokemon;

    const types: { [name: string]: any } = {
        dark: Dark,
        electric: Electric,
        fairy: Fairy,
        fighting: Fighting,
        ground: Ground,
        ice: Ice,
        normal: Normal,
        poison: Poison,
        psychic: Psychic,
        rock: Rock,
        steel: Steel,
        water: Water,
    };
</script>

<div
    data-poketype={pokemon.types[0].type.name}
    class="relative p-2 rounded-lg bg-gradient-to-tr from-[var(--primary-color)] to-[var(--secondary-color)] flex flex-col items-center overflow-hidden isolate group"
>
    <div
        class="absolute inset-0 transition-colors duration-150 ease-in-out bg-black/10 group-hover:bg-black/0"
    />
    <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        class="z-10"
        alt={pokemon.name}
    />

    <ul class="flex gap-2">
        {#each pokemon.types as pokeType}
            <img
                src={`/images/icons/${pokeType.type.name}.png`}
                alt={pokeType.type.name}
                class="w-8 h-8"
            />
        {/each}
    </ul>
</div>
<h4 class="z-10 p-2 font-bold uppercase ">
    {pokemon.name}
</h4>
