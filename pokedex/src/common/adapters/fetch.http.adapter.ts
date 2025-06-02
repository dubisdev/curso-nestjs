import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class FetchHttpAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
