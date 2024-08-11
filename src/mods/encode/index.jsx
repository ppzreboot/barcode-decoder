import { useEffect, useState, useRef } from 'react'
import { encode } from '../../ss/encode'
import css from './index.module.css'
import { Enc_type_selector } from '../enctype_selector'

export
function Encode() {
  const ref_img = useRef(null)

  const [enctype, set_enctype] = useState(0)
  const [content, set_content] = useState('123456')
  const [error, set_error] = useState()

  useEffect(() => {
    set_error(
      encode(enctype, content, ref_img.current)
    )
  }, [content, enctype])

  return <main className={css.container}>
    <label>
      <span>Encode Type</span>
      <Enc_type_selector value={enctype} set_value={set_enctype} />
    </label>
    <label>
      <span>Content</span>
      <textarea value={content} onChange={evt => set_content(evt.target.value)} />
    </label>

    <ul>
      <li>
        <a href='https://hm.hprt.com/help/126/'>ean 和 upc 码的规则</a>比较复杂（对人类而言）
      </li>
      <li>itf 要求输入的位数为偶数</li>
    </ul>

    <p style={{color: 'red'}}>{error}</p>

    <svg ref={ref_img} viewBox='0 0 300 300' />
  </main>
}
