import _ from 'mudash'
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { handleChanges } from 'moltres'
import EngineShape from './EngineShape'
import { MoltresReactInjection } from '../inject'

export default class Moltres extends Component {

  static propTypes = {
    blueprint: PropTypes.object,
    engine: EngineShape.isRequired
  }

  static defaultProps = {
    blueprint: {}
  }

  static childContextTypes = {
    engine: EngineShape.isRequired
  }


  constructor(props, context) {
    super(props, context)
    this.handleBlueprintChange = this.handleBlueprintChange.bind(this)
    this.propChangeHandlers = {
      blueprint: this.handleBlueprintChange
    }
  }

  componentWillMount() {
    MoltresReactInjection.inject(this.props.engine)
    handleChanges(this.propChangeHandlers, this.props)
  }

  componentWillReceiveProps(nextProps) {
    handleChanges(this.propChangeHandlers, nextProps, this.props)
  }

  getChildContext() {
    return { engine: this.props.engine }
  }

  render() {
    return (
      <Provider store={this.props.engine.getStore()}>
        { this.renderDrivers() || <View/> }
      </Provider>
    )
  }

  renderDrivers() {
    const drivers = this.props.engine.getDriversInDependencyOrder()
    return _.reduceRight(drivers, (child, driver) => {
      if (_.isFunction(_.get(driver, 'renderDriver'))) {
        return driver.renderDriver(child)
      }
      return child
    }, null)
  }

  handleBlueprintChange(blueprint) {
    this.props.engine.updateBlueprint(blueprint)
  }
}
