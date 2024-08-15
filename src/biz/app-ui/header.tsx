import { useState } from 'react'
import { Link } from 'wouter'

export
function Header() {
  const [active, set_active] = useState(false)
  const active_class = active ? ' is-active' : ''

  return <header>
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link className='navbar-item' href='/'>
            <h1
              className='title is-5'
            >Barcode Utils</h1>
          </Link>
          <div
            role='button'
            className={'navbar-burger' + active_class}
            onClick={() => set_active(!active)}
          >
            <span /><span /><span /><span />
          </div>
        </div>
        <div className={'navbar-menu' + active_class}>
          <div className='navbar-end'>
            <Link className='navbar-item' href='/encode'>Encode</Link>
            <Link className='navbar-item' href='/decode'>Decode</Link>
            <a className='navbar-item' href='https://github.com/ppzreboot/barcode-qrcode-utils' target='_blank'>Source Code</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
}
