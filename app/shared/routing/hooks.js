import { getAuthorised } from '../../auth/selectors'

export const protectedOnEnter = (store, nextState, replace) => {

  const authorised = getAuthorised(store.getState())

  if ( !authorised ) return replace('login')

}
