import { TypeOfCharacter } from './TypeOfCharacter.interface';

export interface TypeOfResponseAll {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: TypeOfCharacter[];
}
