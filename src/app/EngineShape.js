import { PropTypes } from 'react'

export default PropTypes.shape({
  getModule: PropTypes.func.isRequired,
  getModulesInDependencyOrder: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired,
  injection: PropTypes.object.isRequired,
  updateModule: PropTypes.func.isRequired
})
