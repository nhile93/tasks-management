export function turnOffLoading(isLoading) {
  setTimeout(() => {
    isLoading = false;
  }, 1500);
}