export interface IGameDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  tags: string[];
}

export interface IGameDetailProps {
  gameDetail: IGameDetail;
}
