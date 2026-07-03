import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import useFetch from '../customHooks/useFetch'
import usePost2 from '../customHooks/usePost2'
import SubmitButton from '../components/SubmitButton'
import FormControl from '../components/form/FormControl'
import StatusToggle from '../components/form/StatusToggle'
import SkeletonCreateEdits from '../Users/SkeletonCreateEdits'
import CustomerImageUpload from './CustomerImageUpload'

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid Email').required('Required'),
  phone: yup.string().required('Required'),
  password: yup.string().min(6, 'Minimum 6 characters'),
  profile_image: yup.string(),
  fcm_token: yup.string(),
})

const CustomerEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, data } = useFetch(`customers/${id}`)
  const [res, apiMethod] = usePost2()
  const [imagePath, setImagePath] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const [imageLoader, setImageLoader] = useState(false)

  useEffect(() => {
    if (data?.data) {
      setImagePath(data.data.profile_image_path || '')
      setPreviewImage(data.data.profile_image || '')
    }
  }, [data])

  useEffect(() => {
    if (res?.data?.message) {
      toast.success(res.data.message)
      navigate('/customers')
    }
  }, [navigate, res.data])

  useEffect(() => {
    if (res?.error?.response?.data?.message) {
      toast.error(res.error.response.data.message)
    }
  }, [res.error])

  if (loading || !data?.data) {
    return <SkeletonCreateEdits heading="Edit Customer" />
  }

  const customer = data.data

  const initialValues = {
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    password: '',
    profile_image: customer?.profile_image_path || '',
    fcm_token: customer?.fcm_token || '',
    is_active: customer?.is_active === 1 ? ['1'] : [],
  }

  const handleSubmit = (values) => {
    if (imageLoader) {
      swal('Wait a Few Second', '', 'error')
      return
    }

    if (!values.name || !values.email || !values.phone) {
      swal('Required fields are missing', 'Please fill name, email, and phone.', 'error')
      return
    }

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      profile_image: imagePath || values.profile_image || '',
      fcm_token: values.fcm_token || '',
      is_active: values.is_active?.length > 0 ? 1 : 0,
    }

    if (values.password) {
      payload.password = values.password
    }

    apiMethod(`customers/${id}`, payload)
  }

  return (
    <div className="createTeam user-create-page">
      <div className="user-create-page__shell">
        <div className="TeamModel user-create-page__card transition-all duration-300 bg-white rounded-xl">
          <div className="overflow-auto modelBox">
            <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange>
              <Form name="customerEditForm">
                <div className="TeamBox user-create-page__content p-5 rounded-xl">
                  <aside className="user-create-page__aside">
                    <span className="user-create-page__kicker">Customer Setup</span>
                    <h2>Update customer details</h2>
                    <p>
                      Review the stored customer information and adjust contact fields, password, and active status as needed.
                    </p>
                    <div className="user-create-page__asideNote">
                      <strong>Quick Note</strong>
                      <span>Leave the password empty if the current login should stay unchanged.</span>
                    </div>
                  </aside>

                  <div className="form user-create-page__form mt-7">
                    <section className="user-create-page__section">
                      <div className="user-create-page__sectionHead">
                        <h3>Basic Information</h3>
                        <p>Keep the core identity and contact details accurate.</p>
                      </div>
                      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 w-full">
                        <FormControl name="name" label="Name" placeholder="Enter full name" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" control="input" type="text" />
                        <FormControl name="email" label="Email" placeholder="Enter email address" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" control="input" type="email" />
                        <FormControl name="phone" label="Phone" placeholder="Enter phone number" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" control="input" type="text" />
                      </div>
                    </section>

                    <section className="user-create-page__section">
                      <div className="user-create-page__sectionHead">
                        <h3>Access</h3>
                        <p>Update password only when you want to reset access.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1 w-full">
                        <FormControl name="password" label="New Password" placeholder="Enter new password" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" control="password" type="password" />
                        <FormControl name="fcm_token" label="FCM Token" placeholder="Enter FCM token" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" control="input" type="text" />
                      </div>
                    </section>

                    <section className="user-create-page__section">
                      <div className="user-create-page__sectionHead">
                        <h3>Profile Image</h3>
                        <p>Choose a new image to upload and we will keep the returned storage path in sync.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomerImageUpload
                          imagePath={imagePath}
                          previewImage={previewImage}
                          setImagePath={setImagePath}
                          setPreviewImage={setPreviewImage}
                          setImageLoader={setImageLoader}
                        />
                        <div className="inputBox form-field">
                          <label className="form-field__label">Saved Image Path</label>
                          <input value={imagePath} readOnly placeholder="profile_image/example.png" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg bg-[#F8FAFD]" type="text" />
                        </div>
                      </div>
                    </section>

                    <StatusToggle
                      name="is_active"
                      label="Account Status"
                      description="Enable or disable the customer without changing anything else."
                      checkedLabel="Enable"
                    />
                  </div>
                </div>

                <div className="user-create-page__actions">
                  <Link to="/customers" className="user-create-page__cancel">
                    Cancel
                  </Link>
                  <SubmitButton
                    props={{
                      class: 'user-create-page__submit btn bg-secondary text-white uppercase py-3 px-8 rounded-full block submit hover:bg-primary transition-all duration-300',
                      text: 'Update Customer',
                    }}
                    buttonLoading={res.isLoading}
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerEdit
