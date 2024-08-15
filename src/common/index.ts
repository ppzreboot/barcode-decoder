export
const is_nil = (val: unknown) => val === null || val === undefined
export
const not_nil = (val: unknown) => !is_nil(val)
