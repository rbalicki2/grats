/** @gqlType */
export class SomeType {
  /** @gqlField */
  greeting(args: unknown, ctx): string {
    return ctx.greeting;
  }
}
