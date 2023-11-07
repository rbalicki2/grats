import { ID } from "../../../types";

/** @gqlType */
export default class SomeType {
  /** @gqlField */
  me(): Node {
    throw new Error("Not implemented");
  }
}

class Node {
  id: ID;
}

/** @gqlInterface */
interface Node {
  /** @gqlField */
  id: string;
}
