<script lang="ts">
    import Search from "./icons/search.svelte";

    export let value: string;
    export let updateTimer: number = 200;

    let timer: number;

    function debounce(e: any) {
        const target = e?.target;
        clearTimeout(timer);
        timer = setTimeout(() => {
            value = target.value;
        }, updateTimer);
    }
</script>

<div class="flex flex-row-reverse items-center flex-grow">
    <input
        id="search"
        placeholder="Search using name. Example - pikachu"
        class="flex-grow block p-2 text-white transition-all duration-75 ease-linear outline-none md:flex-grow focus:flex-grow bg-neutral-800 peer placeholder:italic focus:bg-neutral-700"
        on:keyup={debounce}
        autocomplete="off"
    />
    <label
        for="search"
        class="p-1 transition-transform bg-neutral-800 peer-focus:scale-110 peer-focus:outline peer-focus:outline-1 peer-focus:outline-neutral-700"
    >
        <Search width={32} height={32} />
    </label>
</div>
