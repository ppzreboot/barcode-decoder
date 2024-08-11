import { useEffect, useState } from 'react'
import css from './index.module.css'
import { Enc_type_selector } from '../enctype_selector'
import { decode } from '../../ss/decode'

export
function Decode() {
  const [file, set_file] = useState()
  const [enctype, set_enctype] = useState(0)
  const [content, set_content] = useState()
  const [error, set_error] = useState(false)

  useEffect(() => {
    if (!file) return
    decode(file, enctype)
      .then(new_content => {
        set_content(new_content[0]?.rawValue)
        set_error(false)
      })
      .catch(err => {
        console.error(err)
        set_error(true)
      })
  }, [enctype, file])
  return <main className={css.container}>
    <label>
      <span>Encode Type</span>
      <Enc_type_selector value={enctype} set_value={set_enctype} />
    </label>
    <label>
      <span>Barcode</span>
      <input type='file' onChange={evt => set_file(evt.target.files[0])} />
    </label>

    {content && <p>decoded: {content}</p>}
    {!content && !error && <p>no content</p>}
    {error && <p style={{ color: 'red' }}>unrecognized barcode</p>}
  </main>
}
