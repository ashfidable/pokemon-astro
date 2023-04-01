import type { ZodError } from "zod";
import { z } from 'zod'
import { Pokemon, PokemonSchema, AllPokemonSchema, AllPokemon } from "./types";

const API = "https://pokeapi.co/api/v2/pokemon/"

export async function getPokemonByName(name: string): Promise<Pokemon | ZodError<Pokemon>> {
    const request = await fetch(`${API}${name}`)
    const json = await request.json()
    const parse = PokemonSchema.safeParse(json);

    if (!parse.success) {
        return parse.error;
    }

    return parse.data;
}

export async function getAllPokemons(): Promise<Pokemon[] | []> {
    const request = await fetch(`${API}?limit=151`)
    const json = await request.json()
    const parsedResults = AllPokemonSchema.parse(json);

    const results = await Promise.all(parsedResults.results.map(async res => {
        const fetchPokemon = await getPokemonByName(res.name)
        return (
            fetchPokemon
        )
    }))

    const parse = z.array(PokemonSchema).safeParse(results);

    if (!parse.success) {
        console.log(parse.error)
        return []
    }

    return parse.data;
}