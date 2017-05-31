import React from 'react';

const Main = () => (
  <main>
    <Switch>
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route exact path='/' component={Home} />
    </Switch>
  </main>
)

export default Main;
