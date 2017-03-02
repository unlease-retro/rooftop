import { getFormSyncErrors, getFormValues } from 'redux-form/immutable'
import { name } from './constants'

export const advertForm = state => {

  const advertForm = getFormValues(name)(state)

  if (!advertForm) return {}

  return advertForm.toJS()

}

export const doesFormHaveErrors = state => Boolean( getFormSyncErrors(name)(state) )