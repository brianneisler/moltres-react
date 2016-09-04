import { PropTypes } from 'react'

export default PropTypes.shape({
  getDriver: PropTypes.func.isRequired,
  getDriversInDependencyOrder: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired,
  injection: PropTypes.object.isRequired,
  updateBlueprint: PropTypes.func.isRequired
})
