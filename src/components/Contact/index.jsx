import React, { useState } from "react";
import appData from "../../data/app.json";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required(),
  mobile: yup.number(),
  message: yup.string().required().min(50)
})

const initialState = {
  name: '',
  mobile: '',
  message: ''
}

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit:()=>{
      save()
    }
  })
  const save = async () =>{
    try{
      if(formik.values.mobile < 1000000000 && formik.values.mobile > 9999999999) return alert("Mobile No should be 10 digit")
      setLoading(true);
      const result = await axios.post("http://localhost:3001/insert",{ ...formik.values });
      alert(result.data.message);
      formik.handleReset();
      setLoading(false);
    } catch(error){
    }
  }
  return (
    <>
      <section className="contact cont-map">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-5 col-md-6 contact-form wow fadeInDown"
              data-wow-delay=".3s"
            >
              <form id="contact-form" method="post" action="contact.php" onSubmit={formik.handleSubmit}>
                <div className="section-head">
                  <h6>Contact Us</h6>
                  <h4 className="playfont">Get In Touch</h4>
                </div>

                <div className="messages"></div>

                <div className="controls">
                  <div className="form-group position-relative">
                    <input
                      id="form_name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      required="required"
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    { formik.touched.name && formik.errors.name ? <p className="text-danger" style={{ position: "absolute", bottom: "5px", fontSize: "13px", right: "40px" }}>Name is required</p> : undefined}
                  </div>

                  <div className="form-group position-relative">
                    <input
                      id="form_email"
                      type="number"
                      name="mobile"
                      placeholder="Mobile No"
                      required="required"
                      value={formik.values.mobile}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  { formik.touched.mobile && formik.values.mobile < 1000000000 && formik.values.mobile > 9999999999  ? <p className="text-danger" style={{ position: "absolute", bottom: "5px", fontSize: "13px", right: "40px" }}>Mobile Number must be 10 digit</p> : undefined}
                  </div>

                  <div className={`form-group position-relative ${formik.touched.message && Boolean(formik.errors.message)} ? 'border border-danger' : ' `}>
                    <textarea
                      id="form_message"
                      name="message"
                      placeholder="Message"
                      className={`${formik.touched.message && Boolean(formik.errors.message)} ? 'border border-danger' : ' `}
                      rows="4"
                      required="required"
                      value={formik.values.message}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    ></textarea>
                    <p className="" style={{ position: "absolute", bottom: "10px", fontSize: "13px", right: "10px" }}>{formik.values.message.length}</p>
                    { formik.touched.message && formik.errors.message ? <p className="text-danger" style={{ position: "absolute", bottom: "11px", fontSize: "13px", right: "40px" }}>Message Should be 10 characters long</p> : undefined} 
                  </div>

                  <button type="button" onClick={save} disabled={Object.keys(formik.errors).length && !loading} className="btn-curve btn-color">
                    <span>{loading? "Submitting" : "Send Message"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="contact-map">
          <iframe src={appData.mapIframe}></iframe>
        </div>
        <div
          className="bg-img"
          style={{ backgroundImage: "url(/assets/img/002.jpg)" }}
        ></div>
      </section>
    </>
  );
};

export default Contact;
