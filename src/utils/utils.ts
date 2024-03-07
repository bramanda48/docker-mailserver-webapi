export const utils = {
  isEmpty: (obj: any): boolean =>
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length,

  isWithLineBreak: (str: string): boolean => {
    return str && str.match(new RegExp(/\r?\n$/))?.length > 0;
  },

  // This function is similar to the 'numfmt' command
  // with the option '--from=iec'
  // (ex: numfmt --from=iec 100M)
  iecToNum(input: string): number {
    const mapping: { [key: string]: number } = {
      K: 1024,
      M: 1024 ** 2,
      G: 1024 ** 3,
      T: 1024 ** 4,
      P: 1024 ** 5,
      E: 1024 ** 6,
      Z: 1024 ** 7,
      Y: 1024 ** 8,
      R: 1024 ** 9,
      Q: 1024 ** 10,
    };

    const regex = /([0-9\.]+)([KMGTPEZYRQ]?)([i]?)/i;
    const match = input.match(regex);
    if (!match) {
      return 0;
    }

    const value = parseFloat(match[1]);
    const factor = mapping[match[2].toUpperCase()] || 1;
    return value * factor;
  },

  textEncode(text: string): Uint8Array {
    return new TextEncoder().encode(text);
  },

  textDecode(buffer: Uint8Array): string {
    return new TextDecoder("utf-8").decode(buffer);
  },

  arrayDifference<A, B extends A>(array1: A[], array2: B[]): A[] {
    return array2.filter((x) => !array1.includes(x));
  },

  arrayMerge<A, B extends A>(array1: A[], array2: B[]): A[] {
    return [...new Set([...array1, ...array2])];
  },
};
