import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import useFetch from '../customHooks/useFetch'
import usePost from '../customHooks/usePost'
import FormControl from '../components/form/FormControl'
import SubmitButton from '../components/SubmitButton'
import StatusToggle from '../components/form/StatusToggle'
import SkeletonCreateEdits from '../Users/SkeletonCreateEdits'
import GuidanceMediaPreview from './GuidanceMediaPreview'

const validationSchema = yup.object({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  button_text: yup.string().required('Required'),
  redirect_url: yup.string().url('Invalid URL').required('Required'),
})

const GuidanceEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, data } = useFetch(`guidance/${id}`)
  const [res, apiMethod] = usePost()
  const [guideImage, setGuideImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (data?.data?.image) {
      setPreviewUrl(data.data.image)
    }
  }, [data])

  const handleFileChange = (file) => {
    if (!file) return
    setGuideImage(file)
    setPreviewUrl((window.URL || window.webkitURL).createObjectURL(file))
  }

  const handleSubmit = (values) => {
    const formdata = new FormData()
    formdata.append('title', values.title)
    formdata.append('description', values.description)
    formdata.append('button_text', values.button_text)
    formdata.append('redirect_url', values.redirect_url)
    formdata.append('status', values.status?.length > 0 ? 1 : 0)

    if (guideImage) {
      formdata.append('guide_image', guideImage)
    }

    apiMethod(`guidance/${id}`, formdata)
  }

  useEffect(() => {
    if (res?.data?.message) {
      toast.success(res.data.message)
      navigate('/guidance')
    }
  }, [navigate, res.data])

  useEffect(() => {
    if (res?.error?.response?.data?.message) {
      toast.error(res.error.response.data.message)
    }
  }, [res.error])

  if (loading || !data?.data) {
    return <SkeletonCreateEdits heading="Edit Guidance" />
  }

  const guide = data.data

  const initialValues = {
    title: guide?.title || '',
    description: guide?.description || '',
    button_text: guide?.button_text || '',
    redirect_url: guide?.redirect_url || '',
    status: guide?.status === 1 ? ['1'] : [],
  }

  return (
    <section className="product-create-page">
      <div className="product-create-page__hero">
        <span className="product-create-page__eyebrow">Guidance management</span>
        <h2>Edit Guidance</h2>
        <p>Update the guidance content, media, and redirect destination from the same compact workspace.</p>
      </div>

      <div className="bg-white rounded-3xl w-full p-4 mx-auto relative">
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form name="guidanceEditForm" className="product-create-page__form">
            <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
              <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
                <FormControl name="title" label="Title" placeholder="Enter title" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" control="input2" />
                <FormControl name="button_text" label="Button Text" placeholder="Enter button text" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" control="input2" />
                <FormControl name="redirect_url" label="Redirect URL" placeholder="https://quicklease.ae" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" control="input2" />
              </div>
              <div className="mt-4">
                <FormControl name="description" label="Description" placeholder="Enter description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none border border-[#c4d0e3]" control="textarea2" />
              </div>
            </div>

            <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
              <label className="mb-2 block text-[#7D8CA7] text-[.9rem]">Guide Image</label>
              <div className="flex items-center gap-4 max-md:flex-col max-md:items-start">
                <div className="w-[7rem] h-[7rem]">
                  <GuidanceMediaPreview src={previewUrl} alt="Guide preview" className="w-full h-full rounded-2xl object-cover border border-[#CFD5E2] bg-white" />
                </div>
                <div>
                  <label className="inline-flex items-center gap-2 bg-[#d9dcf8] text-secondary px-5 py-3 rounded-full cursor-pointer font-MluvkaBold">
                    <span>Choose Image</span>
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0])} />
                  </label>
                  <p className="mt-2 text-[.85rem] text-[#7D8CA7]">Leave this unchanged if you want to keep the current guidance media.</p>
                </div>
              </div>

              <StatusToggle
                name="status"
                label="Guidance Status"
                checkedLabel="Enable"
              />
            </div>

            <div className="product-create-page__actions">
              <Link to="/guidance" className="product-create-page__cancel">
                Cancel
              </Link>
              <SubmitButton
                props={{
                  class: 'product-create-page__submit btn bg-secondary text-white px-12 uppercase py-3 rounded-full w-100 block submit hover:bg-primary transition-all duration-300',
                  text: 'Update Guidance',
                }}
                buttonLoading={res.isLoading}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  )
}

export default GuidanceEdit
