import _ from 'mudash'
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { compose, defaultProps, lifecycle, setPropTypes, withContext } from 'recompose'
import EngineShape from './EngineShape'
import { withChangeHandlers } from '../recompose'

const enhance = compose(
  defaultProps({
    app: {}
  }),
  setPropTypes({
    app: PropTypes.object
  }),
  getContext({
    engine: EngineShape.isRequired
  }),
  withChangeHandlers({
    app: (app) => {
      console.log('App Changed:', app) // eslint-disable-line no-console
    }
  }),
  lifecycle({
    componentWillMount() {
      // TODO BRN: init app
    }
  })
)

export default enhance(({ children, engine }) => (
  <Provider store={engine.getStore()}>
    { renderDrivers(engine.getInstancesInDependencyOrder(['driver', 'plugin']), children) }
  </Provider>
))

function renderDrivers(drivers, children) {
  return _.reduceRight(drivers, (child, driver) => {
    if (_.isFunction(_.get(driver, 'renderDriver'))) {
      return driver.renderDriver(child)
    }
    return child
  }, children)
}
