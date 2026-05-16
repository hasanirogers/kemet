declare module 'typewriter-effect/dist/core' {
  export interface TypewriterOptions {
    cursor?: string;
    loop?: boolean;
    delay?: number;
    [key: string]: any;
  }

  export default class Typewriter {
    constructor(target: HTMLElement, options?: TypewriterOptions);

    stop(): this;
    deleteAll(speed?: number): this;
    typeString(string: string): this;
    callFunction(callback: () => void): this;
    start(): this;
  }
}
