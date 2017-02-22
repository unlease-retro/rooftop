import React from 'react'
import { reduxForm } from 'redux-form/immutable'

import { Form } from 'components/form'
import { Input as TextInput } from 'components/input'
import { Select as Dropdown } from 'components/select'
import { Textarea } from 'components/textarea'
import { Label } from 'components/label'
import { Error } from 'components/error'
import { View } from 'components/layout'

import { name as form, HOME_TYPES } from './constants'

export const Input = props => {

  const { label, input, type, meta } = props
  const { touched, error } = meta

  const atomic = { m:0, bs:'s', bw:1, bg:'t' }

  let renderElement = <TextInput { ...input } type={ type } atomic={ atomic }/>

  if (!type) renderElement = <Textarea { ...input } height='300px' atomic={ atomic }/>

  if (input.value === 'unspecified') input.value = null

  return (
    <View atomic={{ m:0, mb:2, p:0, d:'f', fd:'c' }}>

      <Label atomic={{ ml:0, mr:0, fs:4 }}>{ label }</Label>

      { renderElement }

      { touched && error ? <Error atomic={{ ml:0, mr:0, mb:0, mt:1 }}>{ label } is required</Error> : null }

    </View>
  )

}


export const Select = props => {

  const { label, input, meta } = props
  const { value, onChange } = input
  const { touched, error } = meta

  const selectDefaults = { autoBlur: false, clearable: false, searchable: false }

  return (
    <View atomic={{ m:0, mb:2, p:0, d:'f', fd:'c' }}>

      <Label atomic={{ ml:0, mr:0 }}>{ label }</Label>

      <Dropdown
        { ...selectDefaults }
        value={ value }
        onChange={ v => onChange(v.value) }
        options={ HOME_TYPES }
        atomic={{ ml:0, mr:0, mb:0, mt:1 }}
        width='100%'
      />

      { touched && error ? <Error atomic={{ ml:0, mr:0, mb:0, mt:1 }}>{ label } is required</Error> : null }

    </View>
  )

}


export default reduxForm( { form, enableReinitialize: true } )( Form )