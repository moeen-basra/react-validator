import * as React from 'react'
import type { ErrorBag } from 'vee-validate/src'
import Validator from 'vee-validate'

type State = {
  errors: ErrorBag,
}

type Field = {
  name: string,
  rules: string,
  alias?: string,
}

export default function withValidator<C: React.ComponentType<any>, F: Array<Field>>(Component: C, fields: F): React.ComponentType<C> {
  return class FormValidator extends React.Component<*, State> {

    validator = new Validator.Validator()

    _isMounted = false

    constructor(props: any) {
      super(props)

      this.attachRules(fields)

      this.state = {
        errors: this.validator.errors,
      }
    }

    componentDidMount() {
      this._isMounted = true
    }

    componentWillUnmount() {
      this._isMounted = false
    }

    validateAll = async (data: any) => {
      const { errors } = this.validator

      for (let fieldName in data) {
        if (data.hasOwnProperty(fieldName)) {
          if (errors.has(fieldName)) {
            errors.remove(fieldName)
          }
        }
      }

      const isValid = await this.validator.validateAll(data)

      if (!isValid && this._isMounted) {
        this.setState({ errors })
      }

      return isValid
    }

    validateOne = ({ name, value }: { name: string, value: any }) => {
      const { errors } = this.validator

      if (errors.has(name)) {
        errors.remove(name)
      }

      const isValid = this.validator.validate(name, value)

      if (!isValid && this._isMounted) {
        this.setState({ errors })
      }

      return isValid
    }

    validate = (data: any, multi: boolean = true) => {
      if (multi) {
        return this.validateAll(data)
      }
      return this.validateOne(data)
    }

    clearErrors = (fieldName: ?string) => {
      const { errors } = this.validator

      if (fieldName) {
        errors.remove(fieldName)
      } else {
        errors.clear()
      }

      if (this._isMounted) {
        this.setState({ errors })
      }
    }

    attachRules = (field: Field | Array<Field>) => {
      if (Array.isArray(field)) {
        field.forEach((f: Field) => {
          this.attachRules(f)
        })
      } else {
        this.detachRules(field)

        this.validator.attach(field)
      }
    }

    detachRules = (field: Field | Array<Field>) => {
      if (Array.isArray(field)) {
        field.forEach((f: Field) => {
          this.detachRules(f)
        })
      } else {
        if (this.validator.fields.find({ name: field.name})) {
          this.validator.detach(field.name)
        }
      }
    }

    addErrors = (field: string, message: any) => {
      const { errors } = this.validator

      if (errors.has(field)) {
        errors.remove(field)
      }

      errors.add(field, message)

      if (this._isMounted) {
        this.setState({ errors })
      }

    }

    render() {
      return <Component {...this.props}
                        validator={this.validator}
                        validate={this.validate}
                        attachRules={this.attachRules}
                        detachRules={this.detachRules}
                        errors={this.state.errors}
                        addErrors={this.addErrors}
                        clearErrors={this.clearErrors}/>
    }
  }
}