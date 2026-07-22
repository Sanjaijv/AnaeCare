export interface ImageMetadata {
  id: string;
  uri: string;
  width: number;
  height: number;
  size: number;
  qualityScore?: number;
  roi?: any;
  prediction?: any;
}
