import * as React from 'react';
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps} from 'redux-form';

import {
  Form,
  FormGroup,
  Col,
  Button,
  ButtonToolbar,
} from 'reactstrap';

// interface IUser {
//   last: string
//   first: string
// }


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values: any/*, dispatch */) => {
  console.log("asyncvalidate")
  console.log(values)
  return sleep(1000) // simulate server latency
    .then(() => {

      console.log(values.last_name)
      console.log(values.last_name === "john")

      if (values.last_name === "john") {
        throw { last_name: 'That username is taken' }
      }
    })
}


// outside your render() method
const renderField = (field: WrappedFieldProps) => (

  <div className={field.meta.asyncValidating ? 'async-validating' : ''}>
    <input {...field.input} />
    {<span>{field.meta.error}</span>}
  </div>
)

const MyForm = (props: InjectedFormProps) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <Form horizontal onSubmit={handleSubmit}>

      <FormGroup controlId={'name_c'}>
        <Col sm={2}>Lastname</Col>
        <Col sm={5}>
          <Field
            id={'name_id'}
            name="last_name"
            component={renderField}
            type="text"
            placeholder="Input Name Here..."
            className={'form-control'}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId={'name_c'}>
        <Col sm={2}>Firstname</Col>
        <Col sm={5}>
          <Field
            id={'name_id'}
            name="first_name"
            component="input"
            type="text"
            placeholder="Input Name Here..."
            className={'form-control'}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={5}>
          <ButtonToolbar>
            <Button bsStyle={'primary'} type="submit"
                    disabled={pristine || submitting}>登録</Button>
            <Button type="button"
                    disabled={pristine || submitting} onClick={reset}>クリア</Button>
          </ButtonToolbar>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default reduxForm<{},{} >({
  form: 'myForm',
  asyncValidate,
  asyncBlurFields: [ 'last_name' ]
})(MyForm);
