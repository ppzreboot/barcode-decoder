import { enctype_list, is_2d_barcode } from '../../../../common/enctype'
import { get_states_deps, useState2_input } from '../../../../common/state'
import { Enctype_select } from '../../../cmp/enctype'
import { Field } from '../../../cmp/form/field'
import { Output } from './output'

export
function Encode() {
  const resp_class = 'column is-half-tablet is-one-third-desktop is-one-quarter-fullhd'

  const states = {
    basic: {
      enctype: useState2_input(enctype_list[0]),
      content: useState2_input(''),
      with_text: useState2_input(true),
    },
    appearence: {
      scale: useState2_input(1),
      margin: useState2_input(0),
      height: useState2_input(20),
      bar_color: useState2_input('#000000'),
      bg_color: useState2_input('#ffffff'),
    },
  }
  const states_values = {
    basic: {
      enctype: states.basic.enctype.value.val,
      content: states.basic.content.value.val,
      with_text: states.basic.with_text.value.val,
    },
    appearence: {
      scale: states.appearence.scale.value.val,
      margin: states.appearence.margin.value.val,
      height: states.appearence.height.value.val,
      bar_color: states.appearence.bar_color.value.val,
      bg_color: states.appearence.bg_color.value.val,
    },
  }

  return <div className='container'>
    <div className='block'>
      <h3 className='title is-5'>Basic</h3>

      <div className='columns is-multiline'>
        <Field className={resp_class} label='Encode Type'>
          <div className='control'>
            <Enctype_select state={states.basic.enctype.value} />
          </div>
        </Field>
      </div>
      <div className='columns'>
        <div className='column is-two-thirds-desktop is-half-fullhd'>
          <Field
            label='Content'
            error={states.basic.content.error.val}
          >
            <div className='control'>
              <textarea
                className='textarea'
                value={states.basic.content.value.val}
                onChange={evt => states.basic.content.value.set(evt.target.value)}
              />
            </div>
          </Field>
          <Field error={states.basic.with_text.error.val}>
            <div className='control'>
              <label className='checkbox'>
                <input type='checkbox'
                  checked={states.basic.with_text.value.val}
                  onChange={evt => states.basic.with_text.value.set(evt.target.checked)}
                />
                &nbsp;with text
              </label>
            </div>
          </Field>
        </div>
      </div>
    </div>

    <div className='block'>
      <h3 className='title is-5'>Appearence</h3>

      <div className='columns is-multiline'>
        <Field className={resp_class} label='Scale'>
          <div className='control'>
            <input
              className='input'
              type='number'
              value={states.appearence.scale.value.val}
              onChange={evt => states.appearence.scale.value.set(Number(evt.target.value))}
            />
          </div>
        </Field>
        <Field className={resp_class} label='Margin'>
          <div className='control'>
            <input
              className='input'
              type='number'
              value={states.appearence.margin.value.val}
              onChange={evt => states.appearence.margin.value.set(Number(evt.target.value))}
            />
          </div>
        </Field>
        {is_2d_barcode(states.basic.enctype.value.val) ||
          <Field className={resp_class} label='Height'>
            <div className='control'>
              <input
                className='input'
                type='number'
                value={states.appearence.height.value.val}
                onChange={evt => states.appearence.height.value.set(Number(evt.target.value))}
              />
            </div>
          </Field>
        }

        <div className={resp_class}>
          <div className='columns is-mobile'>
            <Field className='column is-half-mobile' label='Bar Color'>
              <div className='control'>
                <input
                  className='input'
                  type='color'
                  value={states.appearence.bar_color.value.val}
                  onChange={evt => states.appearence.bar_color.value.set(evt.target.value)}
                />
              </div>
            </Field>
            <Field className='column is-half-mobile' label='Background'>
              <div className='control'>
                <input
                  className='input'
                  type='color'
                  value={states.appearence.bg_color.value.val}
                  onChange={evt => states.appearence.bg_color.value.set(evt.target.value)}
                />
              </div>
            </Field>
          </div>
        </div>
      </div>
    </div>

    <Output opts={states_values} deps={get_states_deps(states)} resp_class={resp_class} />

  </div>
}
