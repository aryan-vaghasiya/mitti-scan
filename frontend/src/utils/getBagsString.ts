export const getBagsString = (bags: number | string | null | undefined) => {
  if (bags === null || bags === undefined || bags === 0) return "Not Required";
  if(bags === 1){
    return "1 bag";
  }
  return `${bags} bags`;
}