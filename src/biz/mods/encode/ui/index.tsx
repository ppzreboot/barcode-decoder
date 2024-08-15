import { Enctype, enctype_list } from '../../../../common/enctype'
import { useState2 } from '../../../../common/state'
import { Enctype_select } from '../../../cmp/enctype'
import { Field } from '../../../cmp/form/field'

export
function Encode() {
  const className = 'column is-half-tablet is-one-third-desktop is-one-quarter-fullhd'

  const states = {
    basic: {
      enctype: useState2<Enctype>(enctype_list[0]),
      content: useState2<string>(''),
    },
    appearence: {

    },
  }

  return <div className='container'>
    <div className='block'>
      <h3 className='title is-5'>Basic</h3>

      <div className='columns is-multiline'>
        <Field className={className} label='Encode Type'>
          <div className='control'>
            <Enctype_select state={states.basic.enctype} />
          </div>
        </Field>
      </div>
      <div className='columns'>
        <Field className='column is-two-thirds-desktop is-half-fullhd' label='Content'>
          <div className='control'>
            <textarea className='textarea' />
          </div>
        </Field>
      </div>
    </div>
  </div>
}
