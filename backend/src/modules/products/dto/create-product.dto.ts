export class CreateProductDto {
  readonly name: string;
  readonly categories?: number[];
  readonly fields?: {
    name: string;
    value: string;
  }[]
}
