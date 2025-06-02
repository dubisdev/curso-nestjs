import { Module } from '@nestjs/common';
import { FetchHttpAdapter } from './adapters/fetch.http.adapter';

@Module({
  providers: [FetchHttpAdapter],
  exports: [FetchHttpAdapter],
})
export class CommonModule {}
