export {}

declare global {
  interface State2<Val> {
    __is_state2: true

    val: Val
    set: (val: Val) => void
  }

  interface State2_input<Val> {
    __is_state2_input: true

    value: State2<Val>
    error: State2<string | null>
  }

  interface States {
    [string]: States | State2 | State2_input
  }
}
