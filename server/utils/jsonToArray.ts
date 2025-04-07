export const jsonToArray = (content: string, key: string): string[] => {
  const json = JSON.parse(content);
  return Array.isArray(json[key]) ? json[key] : [];
};
