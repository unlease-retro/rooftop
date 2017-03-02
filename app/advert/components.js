import React from 'react'
import { reduxForm } from 'redux-form/immutable'

import { Form } from 'components/form'
import { Input } from 'components/input'
import { Select } from 'components/select'
import { Textarea } from 'components/textarea'
import { Label } from 'components/label'
import { Error } from 'components/error'
import { View } from 'components/layout'

import { name as form } from './constants'


const Warning = ({ touched, error, value, label }) => {

  //isNaN(null) === false
  let isNaN = typeof value !== 'number'

  if (!value && isNaN || touched && error) return <Error atomic={{ ml:0, mr:0, mb:0, mt:1 }}>{ label } is required</Error>

  return null

}


const input = props => {

  const { label, input, type, meta } = props
  const { touched, error } = meta

  const atomic = { m:0, bs:'s', bw:1, bg:'t' }

  let renderElement = <Input { ...input } type={ type } atomic={ atomic }/>

  if (!type) renderElement = <Textarea { ...input } height='300px' atomic={ atomic }/>

  if (input.value === 'unspecified') input.value = null

  return (
    <View atomic={{ m:0, mb:2, p:0, d:'f', fd:'c' }}>

      <Label atomic={{ ml:0, mr:0, fs:4 }}>{ label }</Label>

      { renderElement }

      <Warning touched={ touched } error={ error } label={ label } value={ input.value } />

    </View>
  )

}


const select = props => {

  const { label, input, meta, options } = props
  const { onChange } = input
  const { touched, error } = meta

  const selectDefaults = { autoBlur: false, clearable: false, searchable: false }

  return (
    <View atomic={{ m:0, mb:2, p:0, d:'f', fd:'c' }}>

      <Label atomic={{ ml:0, mr:0 }}>{ label }</Label>

      <Select
        { ...selectDefaults }
        value={ input.value }
        onChange={ v => onChange(v.value) }
        options={ options }
        atomic={{ ml:0, mr:0, mb:0, mt:1 }}
        width='100%'
      />

      <Warning touched={ touched } error={ error } label={ label } value={ input.value } />

    </View>
  )

}

export const Components = {
  select,
  input,
}

export default reduxForm( { form, enableReinitialize: true } )( Form )