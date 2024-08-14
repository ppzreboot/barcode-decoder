import { ReactNode } from 'react'

interface Props {
  label?: string
  children: ReactNode
}

export
function Field(props: Props) {
  return <div className='field'>
    {props.label &&
      <label className='label'>{props.label}</label>
    }
    {props.children}
  </div>
}
