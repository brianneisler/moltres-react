import invariant from 'invariant'
import {
  DriverFactory,
  DriverRegistry,
  Engine,
  SchemaCache
} from 'moltres'

export default class MoltresReactInjection {

  static injected = false

  static inject() {
    invariant(
      !MoltresReactInjection.injected,
      'MoltresReactInjection: Cannot inject MoltresReact twice'
    )
    MoltresReactInjection.injected = true
    Engine.injection.injectDriverFactory(DriverFactory)
    Engine.injection.injectDriverRegistry(DriverRegistry)
    Engine.injection.injectSchemaCache(SchemaCache)
  }
}
