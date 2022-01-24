export default function useValidationsInput() {
  const funcIsError = (error = "", touched = "") => (error && touched) || false

  const funcIsTextError = (error = "", touched = "") =>
    error && touched ? error : ""

  return { funcIsError, funcIsTextError }
}
