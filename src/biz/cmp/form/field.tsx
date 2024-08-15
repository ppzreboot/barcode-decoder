import { ReactNode } from 'react'

interface Props {
  className?: string
  label?: string
  children: ReactNode
}

export
function Field(props: Props) {
  return <div className={'field ' + props.className}>
    {props.label &&
      <label className='label'>{props.label}</label>
    }
    {props.children}
  </div>
}
