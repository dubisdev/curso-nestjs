import { Injectable } from '@nestjs/common';
import { PokeReponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  async executeSeed() {
    const data = (await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    ).then((res) => res.json())) as PokeReponse;

    const apiData = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const id = segments.at(-2);

      if (!id) {
        throw new Error(`ID not found in URL: ${url}`);
      }

      return { name, id: +id };
    });

    return apiData;
  }
}
