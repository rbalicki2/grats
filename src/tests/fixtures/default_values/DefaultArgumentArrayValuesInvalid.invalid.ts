/** @gqlType */
export default class SomeType {
  /** @gqlField */
  someField1({ inputs = [func(), func()] }: { inputs?: string[] }): string {
    return inputs.join("|");
  }
}

function func(): string {
  return "sup";
}
