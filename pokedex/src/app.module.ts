import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/{*test}'], // Exclude API routes from static serving
      serveStaticOptions: {
        fallthrough: false, // Prevent serving static files for non-existent routes
      },
    }),
    PokemonModule,
  ],
})
export class AppModule {}
