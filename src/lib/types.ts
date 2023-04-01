import { z } from 'zod';

export const PokemonSchema = z.object({
    name: z.string(),
    sprites: z.object({
        front_default: z.string()
    })
})

export const AllPokemonSchema = z.object({
    results: z.object({
        name: z.string(),
        url: z.string()
    }).array()
})

export type Pokemon = z.infer<typeof PokemonSchema>
export type AllPokemon = z.infer<typeof AllPokemonSchema>
