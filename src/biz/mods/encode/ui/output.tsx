import { useRef, useMemo, DependencyList, useEffect } from 'react'
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
} from '@bwip-js/browser'
import { useState2 } from '../../../../common/state'
import { Enctype } from '../../../../common/enctype'

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

  // @ts-ignore
  encode(canvas, {
    text: props.basic.content,

    scale: props.appearence.scale,
    height: props.appearence.height,
    barcolor: props.appearence.bar_color,
    backgroundcolor: props.appearence.bg_color,
    padding: props.appearence.margin,
  })
}

interface Props {
  opts: Opts
  deps: DependencyList
  resp_class: string
}

export
function Output(props: Props) {
  const canvas_container_ref = useRef<HTMLDivElement>(null)
  const states = {
    width: useState2<number | null>(null),
    error: useState2<string | null>(null),
  }

  const canvas = useMemo(() => {
    return document.createElement('canvas')
  }, [])
  useEffect(() => {
    if (props.opts.basic.content) {
      encode_str(canvas, props.opts)
      canvas.remove()
      canvas_container_ref.current?.appendChild(canvas)
      states.width.set(canvas.width)
    } else {
      states.width.set(null)
      states.error.set(null)
    }
  }, props.deps)


  return <div className='block'>
    <h3 className='title is-5'>Output</h3>

    {states.error.val
      ? <article className='message is-danger'>
          <div className='message-body'>{states.error.val}</div>
        </article>
      : states.width.val
        ? <div className='block'>
            <div ref={canvas_container_ref}></div>
            {states.width.val &&
              <p className='block'>width: {states.width.val}px</p>
            }

            <div className='columns' style={{ maxWidth: 688 }}>
              {['jpg', 'png', 'bmp'].map(suffix =>
                <div className='column' key={suffix}>
                  <button className='button is-fullwidth'>Download .{suffix}</button>
                </div>
              )}
            </div>
          </div>
        : <div className='block'>no content</div>
    }
  </div>
}
