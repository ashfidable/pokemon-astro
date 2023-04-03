<script lang="ts">
    export let tags: string[];

    import { slide } from "svelte/transition";
    import { pokemonTypes } from "../lib/pokemon-type";
</script>

<ul transition:slide|local class="flex flex-wrap gap-2">
    {#each pokemonTypes as type}
        <li>
            <input
                type="checkbox"
                bind:group={tags}
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
                    src={`${import.meta.env.BASE_URL}/images/icons/${type}.png`}
                    alt={type}
                    class="w-6 h-6"
                />
                {type}
            </label>
        </li>
    {/each}
</ul>
