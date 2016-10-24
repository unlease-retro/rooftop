export default () => {

  let prevRoutingState, prevRoutingStateJS

  return (state) => {

    const routingState = state.get('routing')

    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {

      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()

    }

    return prevRoutingStateJS

  }

}
