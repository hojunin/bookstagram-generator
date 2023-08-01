const removeSpaceInString = (targetString: string) => {
  return targetString?.replace(/[" "]/g, '');
};

export { removeSpaceInString };
