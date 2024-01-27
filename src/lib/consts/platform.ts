export function isAppleUser(): boolean {
  return /Mac|iPhone|iPod|iPad/.test(navigator.userAgent);
}
