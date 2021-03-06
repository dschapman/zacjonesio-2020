import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'

import { withTheme } from '@eggheadio/gatsby-theme-egghead-blog/src/components/Theming'
import { rhythm } from '@eggheadio/gatsby-theme-egghead-blog/src/lib/typography'
import { bpMaxSM } from '@eggheadio/gatsby-theme-egghead-blog/src/lib/breakpoints'
import Message from '@eggheadio/gatsby-theme-egghead-blog/src/components/ConfirmMessage/Message'
import { PleaseConfirmIllustration } from '@eggheadio/gatsby-theme-egghead-blog/src/components/ConfirmMessage/Illustrations'
import addToMailchimp from 'gatsby-plugin-mailchimp'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string(),
})

const PostSubmissionMessage = ({ response }) => {
  return (
    <div>
      <Message
        illustration={PleaseConfirmIllustration}
        title={`Awesome.`}
        body={response}
      />
    </div>
  )
}

class SignUp extends React.Component {
  state = {
    submitted: false,
  }

  async handleSubmit(values) {
    this.setState({ submitted: true })
    try {
      const result = await addToMailchimp(values.email_address, {FNAME: values.first_name})
      console.log(result)
      //const responseJson = await result.json()


      this.setState({
        submitted: true,
        response: result.result,
        msg: result.msg,
        errorMessage: null,
      })
    } catch (error) {
      this.setState({
        submitted: false,
        errorMessage: 'Something went wrong!',
      })
    }
  }

  render() {
    const { submitted, response, errorMessage, msg } = this.state
    const successful = response && response === 'success'

    return (
      <div>
        {!successful && (
          <h2
            css={css`
              margin-bottom: ${rhythm(1)}
              margin-top: 0
            `}
          >
            Join the Newsletter
          </h2>
        )}

        <Formik
          initialValues={{
            email_address: '',
            first_name: '',
          }}
          validationSchema={SubscribeSchema}
          onSubmit={values => this.handleSubmit(values)}
          render={({ errors, touched, isSubmitting }) => (
            <>
              {!successful && (
                <Form
                  css={css`
                    display: flex
                    align-items: flex-end
                    label:not(:first-of-type),
                    button {
                      margin-left: 10px
                    }
                    .field-error {
                      display: block
                      //position: absolute
                      color: red
                      font-size: 80%
                    }
                    input,
                    label {
                      width: 100%
                    }
                    ${bpMaxSM} {
                      flex-direction: column
                      align-items: flex-start
                      width: auto
                      label,
                      input {
                        margin: 5px 0 0 0 !important
                        width: 100%
                        display: flex
                        flex-direction: column
                      }
                      button {
                        margin: 20px 0 0 0
                      }
                    }
                  `}
                >
                  <label htmlFor="first_name">
                    <div
                      css={css`
                        display: flex
                        justify-content: space-between
                        align-items: flex-end
                      `}
                    >
                      First Name
                      <ErrorMessage
                        name="first_name"
                        component="span"
                        className="field-error"
                      />
                    </div>
                    <Field
                      aria-label="your first name"
                      aria-required="false"
                      name="first_name"
                      placeholder="Jane"
                      type="text"
                    />
                  </label>
                  <label htmlFor="email">
                    <div
                      css={css`
                        display: flex
                        justify-content: space-between
                        align-items: flex-end
                      `}
                    >
                      Email
                      <ErrorMessage
                        name="email_address"
                        component="span"
                        className="field-error"
                      />
                    </div>
                    <Field
                      aria-label="your email address"
                      aria-required="true"
                      name="email_address"
                      placeholder="jane@acme.com"
                      type="email"
                    />
                  </label>
                  <button
                    data-element="submit"
                    type="submit"
                    disabled={isSubmitting}
                    css={css` 
                      margin-top: 5px;
                    `}
                  >
                    {!isSubmitting && 'Submit'}
                    {isSubmitting && 'Submitting...'}
                  </button>
                </Form>
              )}
              {submitted && successful && (
                <PostSubmissionMessage response={msg} />
              )}
              {errorMessage && <div>{errorMessage}</div>}
            </>
          )}
        />
      </div>
    )
  }
}

export default withTheme(SignUp)