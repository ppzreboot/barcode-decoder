import { useState } from 'react'
import { Encode } from '../mods/encode'
import { Decode } from '../mods/decode'
import { Nav } from './nav'

export
function App() {
  const [active, set_active] = useState('encode')
  return <div>
    <hgroup>
      <h1>Barcode Utils</h1>
      <p>@wow_sock</p>
    </hgroup>
    <Nav active={active} set_active={set_active} />
    <hr />
    {active === 'encode'
      ? <Encode />
      : <Decode />
    }
  </div>
}