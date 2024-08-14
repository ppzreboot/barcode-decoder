import { Field } from '../../../cmp/form/field'

export
function Encode() {
  return <div className='container'>
    <details className='block'>
      <summary>
        <h3 className='title is-5'>Basic</h3>
      </summary>
      <form>
        <Field label='test'>
          <div className='control'>
            <input className='input' />
          </div>
        </Field>
      </form>
    </details>
  </div>
}
