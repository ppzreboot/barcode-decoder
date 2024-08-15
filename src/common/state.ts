import { useState } from 'react'

export
function useState2<Val>(initial_val: Val): State2<Val> {
  const [val, set] = useState(initial_val)
  return { val, set }
}
