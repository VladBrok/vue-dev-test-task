export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 200,
  immediate = false,
): T {
  let timeout: NodeJS.Timeout;

  return function (this: Function, args: Parameters<T>) {
    const fnCall = () => {
      fn.call(this, args);
    };

    if (immediate && !timeout) {
      fnCall();
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fnCall();
    }, delay);
  } as T;
}
