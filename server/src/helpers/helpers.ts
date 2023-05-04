export const handleError = (error: any, res: any) => {
  console.log(error);
  res.status(500).json({ error: "Internal server error" });
};