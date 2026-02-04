export const isResendCooldownPassed = (
  sentAt: Date,
  cooldowmSeconds: number,
): boolean => {
  const diffMs = Date.now() - sentAt.getTime();
  return diffMs > cooldowmSeconds * 1000;
};
