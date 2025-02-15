export const awaitPromise = (fn: () => Promise<void>) => {
  return () => {
    fn().catch(console.error)
  }
}
