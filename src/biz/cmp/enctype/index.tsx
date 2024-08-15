import { Enctype, enctype_list, enctype_name_map } from '../../../common/enctype'
import { Select, I_select_props } from '../form/select'

export
function Enctype_select(props: I_select_props<Enctype>) {
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
