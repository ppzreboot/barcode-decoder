import { enctype_list } from '../../ss/encode'

export
function Enc_type_selector({ value, set_value }) {
  return <select value={value} onChange={evt => set_value(evt.target.value)}>
    {enctype_list.map((type, index) =>
      <option key={type} value={index}>{type[0]}</option>
    )}
  </select>
}