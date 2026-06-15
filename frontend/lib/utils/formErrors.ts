export function getFirstErrorMessage(fields: (any | undefined)[]) {
  return fields.find((f) => f?.message)?.message;
}