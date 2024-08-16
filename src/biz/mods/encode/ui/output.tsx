import { useRef, DependencyList, useEffect } from 'react'
import { Bitmap } from 'binary-bmp'
import {
  interleaved2of5, // itf
  code11,
  rationalizedCodabar, // codabar
  code39,
  code128,
  ean8,
  ean13,
  upca,
  upce,

  qrcode,
  microqrcode,

  RenderOptions,
} from '@bwip-js/browser'
import { download_data_URL } from '../../../../common/download'
import { useState2 } from '../../../../common/state'
import { Enctype, enctype_name_map, is_2d_barcode } from '../../../../common/enctype'

interface Opts {
  basic: {
    enctype: Enctype
    content: string
    with_text: boolean
  }
  appearence: {
    scale: number
    margin: number
    height: number
    bar_color: string
    bg_color: string
  }
}

function encode_str(canvas: HTMLCanvasElement, props: Opts) {
  const encode = {
    [Enctype.ITF]: interleaved2of5,
    [Enctype.code11]: code11,
    [Enctype.codabar]: rationalizedCodabar,
    [Enctype.code39]: code39,
    [Enctype.code128]: code128,
    [Enctype.EAN8]: ean8,
    [Enctype.EAN13]: ean13,
    [Enctype.UPC_A]: upca,
    [Enctype.UPC_E]: upce,
    [Enctype.qrcode]: qrcode,
    [Enctype.micro_qrcode]: microqrcode,
  }[props.basic.enctype]

  const bwip_opts: RenderOptions = {
    text: props.basic.content,

    scale: props.appearence.scale,
    barcolor: props.appearence.bar_color,
    backgroundcolor: props.appearence.bg_color,
    // @ts-ignore
    padding: props.appearence.margin,
  }
  if (!is_2d_barcode(props.basic.enctype))
    bwip_opts.height = props.appearence.height
  if (props.basic.with_text) {
    bwip_opts.alttext = props.basic.content
    const font_size = is_2d_barcode(props.basic.enctype) ? 6 : 16
    bwip_opts.textyoffset = font_size / 3
    bwip_opts.textsize = font_size
  }

  encode(canvas, bwip_opts)
}

interface Props {
  opts: Opts
  deps: DependencyList
  resp_class: string
}

export
function Output(props: Props) {
  const canvas_ref = useRef<HTMLCanvasElement>(null)
  const states = {
    width: useState2<number | null>(null),
    error: useState2<string | null>(null),
  }

  useEffect(() => {
    if (props.opts.basic.content) {
      try {
        const canvas = canvas_ref.current!
        encode_str(canvas, props.opts)
        states.error.set(null)
        states.width.set(canvas.width)
      } catch(err) {
        states.width.set(null)
        // @ts-ignore
        states.error.set(err.message)
      }
    } else {
      states.width.set(null)
      states.error.set(null)
    }
  }, props.deps)

  const display_on = (val: unknown) => ({
    display: val ? undefined : 'none'
  })

  return <div className='block'>
    <h3 className='title is-5'>Output</h3>

    <article className='message is-danger' style={display_on(states.error.val)}>
      <div className='message-body'>{states.error.val}</div>
    </article>

    <div className='block' style={display_on(states.width.val)}>
      <canvas ref={canvas_ref} />
      <p className='block'>width: {states.width.val}px</p>
      <div className='columns' style={{ maxWidth: 688 }}>
        {['jpg', 'png', 'bmp'].map(suffix =>
          <div className='column' key={suffix}>
            <button
              className='button is-fullwidth'
              onClick={() => {
                const canvas = canvas_ref.current!
                const name = `${props.opts.basic.content}-${enctype_name_map[props.opts.basic.enctype]}`
                switch(suffix) {
                  case 'jpg':
                    download_data_URL(canvas.toDataURL('image/jpeg'), name)
                    break
                  case 'png':
                    download_data_URL(canvas.toDataURL('image/png'), name)
                    break
                  case 'bmp':
                    // @ts-ignore
                    download_data_URL(URL.createObjectURL(Bitmap.fromCanvas(canvas).blob()), name)
                    break
                }
              }}
            >Download .{suffix}</button>
          </div>
        )}
      </div>
    </div>

    <div className='block' style={display_on(!states.error.val && !states.width.val)}>no content</div>
  </div>
}
