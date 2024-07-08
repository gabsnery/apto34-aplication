interface IBannerType {
  id: number;
  name: string;
}
export interface IBanner {
  title: string;
  description: string;
  url_image: string;
  type:IBannerType
}
