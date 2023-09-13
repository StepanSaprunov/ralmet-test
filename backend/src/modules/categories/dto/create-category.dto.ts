export class CreateCategoryDto {
  readonly name: string;
  readonly subcategories?: number[];
}
