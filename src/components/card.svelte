<script lang="ts">
    import { onMount } from "svelte";
    import type { Pokemon } from "../lib/types";
    export let pokemon: Pokemon;

    onMount(async () => {
        var promise = await import("../../scripts/router");
    });
</script>

<a
    data-swup-preload
    href={`${import.meta.env.BASE_URL}pokemon/${pokemon.name}`}
    data-poketype={pokemon.types[0].type.name}
    class="relative p-2 rounded-lg bg-gradient-to-tr from-[var(--primary-color)] to-[var(--secondary-color)] flex flex-col items-center overflow-hidden isolate group"
>
    <div
        class="absolute inset-0 transition-colors duration-150 ease-in-out bg-black/10 group-hover:bg-black/0"
    />
    <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        class="z-10"
        width="190"
        height="190"
        alt={pokemon.name}
        loading="lazy"
        decoding="sync"
    />

    <ul class="flex gap-2">
        {#each pokemon.types as pokeType}
            <li>
                <img
                    src={`${import.meta.env.BASE_URL}/images/icons/${
                        pokeType.type.name
                    }.png`}
                    alt={pokeType.type.name}
                    class="w-8 h-8"
                />
            </li>
        {/each}
    </ul>
</a>
<h4 class="z-10 p-2 font-bold uppercase">
    {pokemon.name}
</h4>
