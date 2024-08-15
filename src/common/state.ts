import { useState } from 'react'

export
function useState2<Val>(initial_val: Val): State2<Val> {
  const [val, set] = useState(initial_val)
  return { val, set }
}

export
function useState2_input<Val>(initial_val: Val) {
  const value = useState2(initial_val)
  const error = useState2<string | null>(null)
  return { value, error }
}
