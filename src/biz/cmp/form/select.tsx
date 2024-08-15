interface Props<Val extends string | number> {
  state: State2<Val>
  opts: {value: Val, label: string}[]
}

export
function Select<Val extends string | number>(props: Props<Val>) {
  return <div className='select'>
    <select
      value={props.state.val}
      onChange={evt => props.state.set(evt.target.value)}
    >
      {props.opts.map(opt =>
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      )}
    </select>
  </div>
}