import _ from 'mudash'
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { compose, defaultProps, setPropTypes, withContext } from 'recompose'
import EngineShape from './EngineShape'
import { withChangeHandlers } from '../recompose'
import Moltres from './Moltres'

const enhance = compose(
  defaultProps({
    blueprint: {}
  }),
  setPropTypes({
    blueprint: PropTypes.object,
    engine: EngineShape.isRequired
  }),
  withContext(
    { engine: EngineShape.isRequired },
    (props) => ({
      engine: props.engine
    })
  ),
  withChangeHandlers({
    blueprint: (blueprint) => {
      console.log('Blueprint Changed:', blueprint) // eslint-disable-line no-console
    }
  }),
  withProps(( engine, blueprint ) => ({
    app: engine.eval(blueprint)
  }))
)

export default enhance(({ app }) => (
  <Moltres app={app}/>
))
