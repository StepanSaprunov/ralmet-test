const calcOffset = (page: number, limit: number) => {
  return (page - 1) * limit;
};

export { calcOffset };