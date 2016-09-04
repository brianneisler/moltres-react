import invariant from 'invariant'
import {
  DriverFactory,
  DriverRegistry,
  SchemaCache
} from 'moltres'

export default class MoltresReactInjection {

  static injected = false

  static inject(engine) {
    invariant(
      !MoltresReactInjection.injected,
      'MoltresReactInjection: Cannot inject MoltresReact twice'
    )
    MoltresReactInjection.injected = true
    engine.injection.injectDriverFactory(DriverFactory)
    engine.injection.injectDriverRegistry(DriverRegistry)
    engine.injection.injectSchemaCache(SchemaCache)
  }
}
