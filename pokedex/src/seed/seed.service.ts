import { Injectable } from '@nestjs/common';
import { PokeReponse } from './interfaces/poke-response.interface';
import { Pokemon } from '@/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=650');
    const data = (await res.json()) as PokeReponse;

    const apiData = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const id = segments.at(-2);

      if (!id) {
        throw new Error(`ID not found in URL: ${url}`);
      }

      return { name, no: +id };
    });

    await this.pokemonModel.insertMany(apiData);

    return 'Seed executed successfully';
  }
}
