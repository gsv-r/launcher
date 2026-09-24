export interface TrackMetadata {
  id: number;
  name: string;
  country: string;
  length: number;
  version: string;
  author: string;
}

export interface Track extends TrackMetadata {
  preview: string | null
  layouts: string[]
}