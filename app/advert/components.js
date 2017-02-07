import React from 'react'
import { reduxForm } from 'redux-form/immutable'

import { Form as StyledForm } from 'components/form'
import { Input as TextInput } from 'components/input'
import { Textarea } from 'components/textarea'
import { Label } from 'components/label'
import { Error } from 'components/error'
import { View } from 'components/layout'

import { name as form } from './constants'

export const Form = reduxForm( { form } )( StyledForm )

export const Input = props => {

  const { label, input, type, defaultValue, meta } = props
  const { pristine, touched, error } = meta

  const atomic = { m:0, bs:'s', bw:1, bg:'t' }

  // set value to default value
  if (pristine) input.value = defaultValue

  let renderElement = <TextInput { ...input } type={ type } atomic={ atomic }/>

  if (!type) renderElement = <Textarea { ...input } atomic={ atomic }/>

  return (
    <View atomic={{ m:0, mb:2, p:0, d:'f', fd:'c' }}>

      <Label atomic={{ ml:0, mr:0 }}>{ label }</Label>

      { renderElement }

      { touched && error ? <Error atomic={{ ml:0, mr:0, mb:0, mt:1 }}>{ label } is required</Error> : null }

    </View>
  )

}