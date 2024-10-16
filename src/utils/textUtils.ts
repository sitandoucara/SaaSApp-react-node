export const truncateContent = (content: string, length: number): string => {
  return content.length > length
    ? content.substring(0, length) + "..."
    : content;
};
