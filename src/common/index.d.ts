export {}

declare global {
  interface State2<Val> {
    val: Val
    set: (val: val) => void
  }
}
