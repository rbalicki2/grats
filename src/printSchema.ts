import {
  DocumentNode,
  GraphQLSchema,
  print,
  visit,
  specifiedScalarTypes,
} from "graphql";
import { ConfigOptions } from "./gratsConfig";
import { codegen } from "./codegen";
import { METADATA_DIRECTIVE_NAMES } from "./metadataDirectives";

/**
 * Prints code for a TypeScript module that exports a GraphQLSchema.
 * Includes the user-defined (or default) header comment if provided.
 */
export function printExecutableSchema(
  schema: GraphQLSchema,
  config: ConfigOptions,
  destination: string,
): string {
  const code = codegen(schema, destination);
  if (config.tsSchemaHeader) {
    return `${config.tsSchemaHeader}\n${code}`;
  }
  return code;
}

/**
 * Prints SDL, potentially omitting directives depending upon the config.
 * Includes the user-defined (or default) header comment if provided.
 */
export function printGratsSDL(
  doc: DocumentNode,
  config: ConfigOptions,
): string {
  let sdl = printSDLWithoutMetadata(doc);

  if (config.schemaHeader) {
    sdl = `${config.schemaHeader}\n${sdl}`;
  }
  return sdl + "\n";
}

export function printSDLWithoutMetadata(doc: DocumentNode): string {
  const trimmed = visit(doc, {
    DirectiveDefinition(t) {
      return METADATA_DIRECTIVE_NAMES.has(t.name.value) ? null : t;
    },
    Directive(t) {
      return METADATA_DIRECTIVE_NAMES.has(t.name.value) ? null : t;
    },
    ScalarTypeDefinition(t) {
      return specifiedScalarTypes.some((scalar) => scalar.name === t.name.value)
        ? null
        : t;
    },
  });
  return print(trimmed);
}
