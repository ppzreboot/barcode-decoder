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
      scale: useState2<number>(1),
      margin: useState2<number>(0),
      height: useState2<number>(30),
      bar_color: useState2<string>('#000000'),
      bg_color: useState2<string>('#ffffff'),
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

    <div className='block'>
      <h3 className='title is-5'>Appearence</h3>

      <div className='columns is-multiline'>
        <Field className={className} label='Scale'>
          <div className='control'>
            <input
              className='input'
              type='number'
              value={states.appearence.scale.val}
              onChange={evt => states.appearence.scale.set(Number(evt.target.value))}
            />
          </div>
        </Field>
        <Field className={className} label='Margin'>
          <div className='control'>
            <input
              className='input'
              type='number'
              value={states.appearence.margin.val}
              onChange={evt => states.appearence.margin.set(Number(evt.target.value))}
            />
          </div>
        </Field>
        <Field className={className} label='Height'>
          <div className='control'>
            <input
              className='input'
              type='number'
              value={states.appearence.height.val}
              onChange={evt => states.appearence.height.set(Number(evt.target.value))}
            />
          </div>
        </Field>

        <div className={className}>
          <div className='columns is-mobile'>
            <Field className='column is-half-mobile' label='Bar Color'>
              <div className='control'>
                <input
                  className='input'
                  type='color'
                  value={states.appearence.bar_color.val}
                  onChange={evt => states.appearence.bar_color.set(Number(evt.target.value))}
                />
              </div>
            </Field>
            <Field className='column is-half-mobile' label='Background'>
              <div className='control'>
                <input
                  className='input'
                  type='color'
                  value={states.appearence.bg_color.val}
                  onChange={evt => states.appearence.bg_color.set(Number(evt.target.value))}
                />
              </div>
            </Field>
          </div>
        </div>
      </div>
    </div>
  </div>
}
