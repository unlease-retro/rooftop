import React from 'react'
import { reduxForm } from 'redux-form/immutable'

import { Form as StyledForm } from 'components/form'
import { Input as TextInput } from 'components/input'
import { Textarea } from 'components/textarea'

import { name as form } from './constants'

export const Form = reduxForm( { form } )( StyledForm )

export const Input = ( { input, type, defaultValue } ) => {

  const atomic = { mt: 0 }
  // set value to default value
  if (!input.value) input.value = defaultValue
      
  if (!type) return <Textarea { ...input } atomic={ atomic }/>

  return <TextInput { ...input } type={ type } atomic={ atomic }/>

}