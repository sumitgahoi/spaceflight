export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function timedPromise<T>(target: Promise<T>, ms: number) {
  return new Promise<T>((res, rej) => {
    target.then(res).catch(rej);
    setTimeout(rej, ms);
  });
}
