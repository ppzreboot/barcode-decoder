import { DependencyList, useState } from 'react'

export
function useState2<Val>(initial_val: Val): State2<Val> {
  const [val, set] = useState(initial_val)
  return { val, set, __is_state2: true }
}

export
function useState2_input<Val>(initial_val: Val): State2_input<Val> {
  const value = useState2(initial_val)
  const error = useState2<string | null>(null)
  return { value, error, __is_state2_input: true }
}

export
function get_states_deps(states: States): DependencyList {
  function recurse(states: States, result: unknown[]) {
    Object.entries(states).forEach(
      ([_, value]) => {
        if (value.__is_state2)
          result.push(value.val)
        else if (value.__is_state2_input)
          result.push(value.value.val)
        else
          recurse(value, result)
      }
    )
    return result
  }
  return recurse(states, [])
}
