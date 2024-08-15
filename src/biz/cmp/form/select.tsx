export
interface I_select_props<Val extends string | number> {
  state: State2<Val>
  opts: {value: Val, label: string}[]
}

export
function Select<Val extends string | number>(props: I_select_props<Val>) {
  return <select value={props.state.val} onChange={evt => props.state.set(evt.target.value)}>
    {props.opts.map(opt =>
      <option value={opt.value}>{opt.label}</option>
    )}
  </select>
}