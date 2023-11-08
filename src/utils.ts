export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function timedPromise<T>(p: Promise<T>, ms: number) {
  return new Promise<T>((res, rej) => {
    p.then((result: T) => res(result)).catch((err) => rej(err));
    setTimeout(rej, ms);
  });
}
