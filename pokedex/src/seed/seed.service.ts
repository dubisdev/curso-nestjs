import { Injectable } from '@nestjs/common';
import { PokeReponse } from './interfaces/poke-response.interface';
import { Pokemon } from '@/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FetchHttpAdapter } from '@/common/adapters/fetch.http.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly httpAdapter: FetchHttpAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=650';

    const data = await this.httpAdapter.get<PokeReponse>(API_URL);

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
