export const testJSON = (text: string) => {
  if(typeof text !== "string") return false;
  
  try {
    JSON.parse(text);
    return true;
  } catch (e) {
    return false;
  }
}