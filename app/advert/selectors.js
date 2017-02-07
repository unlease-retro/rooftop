import { getFormValues } from 'redux-form/immutable'
import { name } from './constants'

export const editForm = state => {

  const editForm = getFormValues(name)(state)

  if (!editForm) return {}

  return editForm.toObject()

}

export const hasFormBeenEdited = state => Boolean( getFormValues(name)(state) && getFormValues(name)(state).size )
