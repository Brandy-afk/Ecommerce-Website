export default interface Disc {
  custom: boolean;
  discType: number;
  diameter: number;
  thickness: number;
  weight: number;
}

export interface DiscWithId extends Disc {
  productId: string;
}
