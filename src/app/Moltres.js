import _ from 'mudash'
import { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Engine, handleChanges } from 'moltres'
import EngineShape from './EngineShape'
import { MoltresReactInjection } from '../inject'

export default class Moltres extends Component {

  static propTypes = {
    blueprint: PropTypes.object
  }

  static defaultProps = {
    blueprint: {}
  }

  static childContextTypes = {
    engine: EngineShape.isRequired
  }


  constructor(props, context) {
    super(props, context)
    this.engine = Engine
    this.handleBlueprintChange = this.handleBlueprintChange.bind(this)
    this.propChangeHandlers = {
      blueprint: this.handleBlueprintChange
    }
  }

  componentWillMount() {
    MoltresReactInjection.inject()
    handleChanges(this.propChangeHandlers, this.props)
  }

  componentWillReceiveProps(nextProps) {
    handleChanges(this.propChangeHandlers, nextProps, this.props)
  }

  getChildContext() {
    return { engine: this.engine }
  }

  render() {
    return (
      <Provider store={this.engine.getStore()}>
        this.renderDrivers()
      </Provider>
    )
  }

  renderDrivers() {
    const drivers = this.engine.getDriversInDependencyOrder()
    return _.reduceRight(drivers, (child, driver) => {
      if (_.isFunction(_.get(driver, 'renderDriver'))) {
        return driver.renderDriver(child)
      }
      return child
    }, null)
  }

  handleBlueprintChange(blueprint) {
    this.engine.updateBlueprint(blueprint)
  }
}
