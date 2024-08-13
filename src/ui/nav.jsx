export
function Nav({ active, set_active }) {
  return <nav>
    <ul>
      {['encode', 'decode'].map(key =>
        <li key={key}>
          {active === key
            ? key
            : <a href='#' onClick={() => set_active(key)}>{key}</a>
          }
        </li>
      )}
      <li>
        <a href='https://github.com/ppzreboot/barcode-decoder' target='_blank'>Source Code</a>
      </li>
    </ul>
  </nav>
}