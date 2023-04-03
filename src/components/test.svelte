<script>
    import { getAllPokemons } from "../lib/pokemon";
    import Pagination from "./pagination.svelte";

    export let pokemons;
</script>

<Pagination items={pokemons} />
