import { useRef } from 'react'
import { useState2 } from '../../../../common/state'

export
function Output() {
  const canvas_container_ref = useRef<HTMLDivElement>(null)
  const states = {
    width: useState2<number | null>(null),
    error: useState2<string | null>(null),
  }

  return <div className='block'>
    <h3 className='title is-5'>Output</h3>

    {states.error.val
      ? <article className='message is-danger'>
          <div className='message-body'>{states.error.val}</div>
        </article>
      : states.width.val
        ? <div className='block'>
            <div ref={canvas_container_ref}></div>
            {states.width.val ??
              <p className='block'>width: {states.width.val}px</p>
            }
            <div className='columns'>
              <button className='button column is-one-fifth-fullhd'>Download .jpg</button>
              <button className='button column is-one-fifth-fullhd'>Download .png</button>
              <button className='button column is-one-fifth-fullhd'>Download .bmp</button>
            </div>
          </div>
        : <div className='block'>no content</div>
    }
  </div>
}
