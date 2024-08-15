import { Enctype, enctype_list, enctype_name_map } from '../../../common/enctype'
import { Select } from '../form/select'

interface Props {
  state: State2<Enctype>
}

export
function Enctype_select(props: Props) {
  return <Select
    state={props.state}
    opts={enctype_list.map(value => 
      ({
        value,
        label: enctype_name_map[value],
      })
    )}
  />
}
