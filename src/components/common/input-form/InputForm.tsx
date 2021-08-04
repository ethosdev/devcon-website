import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import css from './input-form.module.scss'

interface InputFormProps {
  label?: string
  placeholder: string
  transparentMode?: boolean
  timeout?: number
  icon?: React.ComponentType<any>
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

export function InputForm(props: InputFormProps) {
  let className = css['form']
  if (props.className) className = `${props.className} ${className}`
  if (props.transparentMode) className += ` ${css['transparent']}`
  const [value, setValue] = useState(props.defaultValue || '')

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue)
    }
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (props.onChange && props.timeout) {
        props.onChange(value)
      }
    }, props.timeout)

    return () => clearTimeout(delayDebounceFn)
  }, [value])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)

    if (props.onChange && !props.timeout) {
      props.onChange(event.target.value)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (props.onSubmit) {
      props.onSubmit(value)
    }
  }

  const id = `input-form_${props.placeholder}_${props.label}`

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className={css['container']}>
        {props.label && <label htmlFor={id}>{props.label}</label>}
        {/* <div className={css['input']}> */}
        <input
          className="font-md-fixed"
          type="text"
          id={id}
          value={value}
          placeholder={props.placeholder}
          onChange={handleChange}
        />
        {props.icon && <props.icon className={`${css['icon']} icon`} />}
        {/* </div> */}
      </div>
    </form>
  )
}