import _ from 'mudash'
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { compose, defaultProps, lifecycle, setPropTypes, withContext } from 'recompose'
import { actions } from '@moltres/driver/app'
import EngineShape from './EngineShape'
import { withChangeHandlers } from '../recompose'


const { appReady } = actions

const enhance = compose(
  defaultProps({
    app: {}
  }),
  setPropTypes({
    app: PropTypes.object,
    engine: EngineShape.isRequired
  }),
  withContext(
    { engine: EngineShape.isRequired },
    (props) => ({
      engine: props.engine
    })
  ),
  withChangeHandlers({
    app: (app) => {
      console.log('App Changed:', app) // eslint-disable-line no-console
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.engine.getStore().dispatch(appReady(this.props.app))
    }
  })
)

export default enhance(({ children, engine }) => (
  <Provider store={engine.getStore()}>
    { renderDrivers(engine.getModulesInDependencyOrder(['driver', 'plugin']), children) }
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
