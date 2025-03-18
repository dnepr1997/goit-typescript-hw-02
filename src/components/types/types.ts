export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface ImageNow {
  src: string;
  alt: string;
}

export interface PhotoServiceResponse {
  total_pages: number;
  results: Image[];
}
