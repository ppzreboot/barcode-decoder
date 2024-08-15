import { ReactNode } from 'react'
import { not_nil } from '../../../common'

interface Props {
  className?: string
  label?: string
  error?: string | null
  children: ReactNode
}

export
function Field(props: Props) {
  return <div className={'field ' + props.className}>
    {props.label &&
      <label className='label'>{props.label}</label>
    }
    {props.children}
    {not_nil(props.error) &&
      <p className='help is-danger'>{props.error}</p>
    }
  </div>
}
