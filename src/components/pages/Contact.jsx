import React, { useState } from "react";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import ScrollIndicator from "../modules/ScrollIndicator";
import emailjs from "emailjs-com";
import "../../css/pages/Contact.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then(
        () => setSubmitted(true),
        () => alert("Failed to send message.")
      );
  };

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <p>
        Have a question or want to get in touch? Fill out the form below or email me at{" "}
        <a href="mailto:AlexanderStubMichelsen@gmail.com">AlexanderStubMichelsen@gmail.com</a>
      </p>
      {submitted ? (
        <div className="contact-success">
          <h2>Thank you!</h2>
          <p>Your message has been sent. I will get back to you soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="form-control"
              rows={5}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="contact-page-wrapper">
        <ContactForm />
      </div>
      <Footer />
      <ScrollIndicator />
    </>
  );
};

export default Contact;