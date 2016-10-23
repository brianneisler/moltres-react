import { lifecycle } from 'recompose'
import createHelper from './createHelper'
import { handleChanges } from '../util'

const withChangeHandlers = handlers =>
  lifecycle({
    componentDidMount() {
      handleChanges(handlers, this.props)
    },
    componentWillReceiveProps(nextProps) {
      handleChanges(handlers, nextProps, this.props)
    }
  })

export default createHelper(withChangeHandlers, 'withChangeHandlers')
