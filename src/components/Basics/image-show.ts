export interface ImageShowProps {
  images?: string[];
}

export const clickPrev = (index: number, imageList: string[]): number => {
  return index > 0 ? index - 1 : imageList.length - 1;
};

export const clickNext = (index: number, imageList: string[]): number => {
  return index < imageList.length - 1 ? index + 1 : 0;
};
