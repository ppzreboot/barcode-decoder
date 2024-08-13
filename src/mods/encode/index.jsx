import { useEffect, useState, useRef } from 'react'
import { Bitmap } from 'binary-bmp'
import { encode } from '../../ss/encode'
import { Enc_type_selector } from '../enctype_selector'

export
function Encode() {
  const ref_img = useRef(null)

  const [enctype, set_enctype] = useState(0)
  const [content, set_content] = useState('999999')
  const file_name = `${enctype}-${content}`

  const [margin, set_margin] = useState_margin()
  const [height, set_height] = useState_height()
  const [scale, set_scale] = useState_width(1)

  const [color, set_color] = useState('#f9ed69')
  const [bg_color, set_bg_color] = useState('#b83b5e')

  const [error, set_error] = useState()

  const [output_width, set_output_width] = useState(0)

  useEffect(() => {
    set_error(
      encode(ref_img.current, content, enctype, {
        width: scale,
        height,
        margin,

        lineColor: color,
        background: bg_color,
      }))
      set_output_width(ref_img.current.width)
  }, [content, enctype, margin, height, scale, color, bg_color])

  return <main className='container'>

    <section className='grid'>
      <div>
        <h3>Basic</h3>
        <label>Encode Type</label>
        <Enc_type_selector value={enctype} set_value={set_enctype} />
        <label>Content</label>
        <textarea value={content} onChange={evt => set_content(evt.target.value)} />
        <ul>
          <li>
            <a href='https://hm.hprt.com/help/126/'>ean 和 upc 码的规则</a>比较复杂（对人类而言）
          </li>
          <li>itf 要求输入的位数为偶数</li>
        </ul>
      </div>
      <div>
        <h3>Appearence</h3>
        <label>Margin</label>
        <input type='number' value={margin} onChange={evt => set_margin(evt.target.value)}></input>
        <label>Scale</label>
        <input type='number' value={scale} onChange={evt => set_scale(evt.target.value)}></input>
        <label>Height</label>
        <input type='number' value={height} onChange={evt => set_height(evt.target.value)}></input>
        <label>Color</label>
        <input type='color' value={color} onChange={evt => set_color(evt.target.value)}></input>
        <label>Background</label>
        <input type='color' value={bg_color} onChange={evt => set_bg_color(evt.target.value)}></input>
      </div>
    </section>

    <section className='grid'>
      <div>
        <h3>Output</h3>
        <canvas ref={ref_img} />
        <p style={{color: 'red'}}>{error}</p>
        <p>barcode width: {output_width}</p>

        <h3>Download</h3>
        <div className='grid'>
          <button
            onClick={() => {
              download(file_name, ref_img.current.toDataURL())
            }}
          >png</button>
          <button
            onClick={() => {
              download(file_name, ref_img.current.toDataURL('image/jpeg'))
            }}
          >jpeg</button>
          <button
            onClick={() => {
              download(file_name,
                URL.createObjectURL(
                  Bitmap.fromCanvas(ref_img.current).blob()
                )
              )
            }}
          >bmp</button>
        </div>
      </div>
      <div></div>
    </section>
  </main>
}

function download(name, data_URL) {
  const a = document.createElement('a')
  a.download = name
  a.href = data_URL
  a.click()
}

function useState_number(initial_val) {
  const [val, set] = useState(initial_val)
  return [
    val,
    new_raw_val => {
      const new_val = Number(new_raw_val)
      if (isNaN(new_val))
        throw Error(`invalid number ${new_raw_val}`)
      set(new_val)
    }
  ]
}

function useState_width() {
  const [val, set] = useState_number(1)
  return [
    val,
    val => {
      if (val < 1)
        set(1)
      else
        set(val)
    }
  ]
}
function useState_height() {
  const [val, set] = useState_number(30)
  return [
    val,
    val => {
      if (val < 1)
        set(1)
      else
        set(val)
    }
  ]
}
function useState_margin() {
  const [val, set] = useState_number(0)
  return [
    val,
    val => {
      if (val < 0)
        set(0)
      else
        set(val)
    }
  ]
}
