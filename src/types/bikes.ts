export interface BikeMetadata {
  id: number;
  name: string;
  brand: string;
  class: string;
  year: number;
  version: string;
  author: string;
}

export interface Bike extends BikeMetadata {
  preview: string | null
}