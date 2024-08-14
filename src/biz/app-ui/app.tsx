import { Router, Switch, Route } from 'wouter'
import { Header } from './header'
import { Encode } from '../mods/encode/ui'
import { Decode } from '../mods/decode/ui'

import { app_base_path } from '../../../const'

export
function App() {
  /**
   * Router 仅在需自定义参数时，必要
   * Switch 仅在需渲染一个 Route 时，必要
   */
  return <Router base={app_base_path}>
    <Header />
    <section className='section'>
      <Switch>
        <Route path='/encode' component={Encode} />
        <Route path='/decode' component={Decode} />

        <Encode />
      </Switch>
    </section>
  </Router>
}
