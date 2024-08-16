import { useRef, DependencyList, useEffect } from 'react'
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
import { useState2 } from '../../../../common/state'
import { Enctype, is_2d_barcode } from '../../../../common/enctype'

interface Opts {
  basic: {
    enctype: Enctype
    content: string
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

  console.log({
    text: props.basic.content,

    scale: props.appearence.scale,
    height: props.appearence.height,
    barcolor: props.appearence.bar_color,
    backgroundcolor: props.appearence.bg_color,
    padding: props.appearence.margin,
  })

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
        states.width.set(canvas.width)
      } catch(err) {
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
            <button className='button is-fullwidth'>Download .{suffix}</button>
          </div>
        )}
      </div>
    </div>

    <div className='block' style={display_on(!states.width.val)}>no content</div>
  </div>
}
