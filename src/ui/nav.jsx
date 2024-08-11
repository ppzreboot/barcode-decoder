import css from './nav.module.css'

export
function Nav({ active, set_active }) {
  return <nav>
    <ul className={css.list}>
      {['encode', 'decode'].map(key =>
        <li key={key} className={css.item}>
          <a href={active === key ? undefined : '#'} onClick={() => set_active(key)}>+ {key}</a>
        </li>
      )}
    </ul>
  </nav>
}