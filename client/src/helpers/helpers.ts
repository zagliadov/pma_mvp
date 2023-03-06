export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isItemExist = (item: string, array: string[]): boolean => {
  return array.some((e: string) => e === item);
};