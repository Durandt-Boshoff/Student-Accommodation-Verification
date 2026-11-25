
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomFinder from "../components/RoomFinder";

const initialForm = {
  name: "",
  email: "",
  category: "",
  message: "",
};

function validateForm(form) {
  const errors = {};

  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  // NAME: 2–50 characters, letters and normal name punctuation only
  const namePattern = /^[\p{L}\s'-]+$/u;
  const letterCount = (name.match(/\p{L}/gu) || []).length;

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > 50 || letterCount < 2 || !namePattern.test(name)) {
    errors.name =
      "Enter a valid name using 2–50 characters. Numbers and symbols are not allowed.";
  }

  // EMAIL: standard email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > 254 || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // CATEGORY: must be selected
  if (!form.category) {
    errors.category = "Please select an enquiry category.";
  }

  // MESSAGE: 10–1,000 characters
  if (!message) {
    errors.message = "Please enter your message.";
  } else if (message.length < 10) {
    errors.message = "Your message must contain at least 10 characters.";
  } else if (message.length > 1000) {
    errors.message = "Your message cannot exceed 1,000 characters.";
  }

  return errors;
}

function ContactIcon({ type }) {
  if (type === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.2L4 20l1.3-3.5A8.3 8.3 0 1 1 20 11.5Z" />
        <path d="M9 8.5c.5 2.3 2.2 4 4.5 4.5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4m0 4h.01" />
    </svg>
  );
}

function ContactCard({ icon, title, children, iconColor = "text-[#087CFF]" }) {
  return (
    <div className="rounded-[22px] border border-slate-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <span className={iconColor}>
          <ContactIcon type={icon} />
        </span>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="mt-3 text-sm leading-7 text-slate-500">
        {children}
      </div>
    </div>
  );
}

export default function ContactUsPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // Frontend demonstration only.
    // No email is sent until an email service is connected.
    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087CFF] focus:ring-4 focus:ring-blue-50 ${
      errors[field] ? "border-red-400" : "border-slate-200"
    }`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="border-b border-slate-100 bg-gradient-to-br from-[#F1F7FF] via-[#F8FAFF] to-white px-5 py-20 text-center md:py-28">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-[#087CFF]">
              <ContactIcon type="email" />
              Contact ResiSure
            </span>

            <h1 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Let's Talk
              <span className="text-[#087CFF]">.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
              Have a question about student accommodation, need assistance
              or simply want to know more about ResiSure? We'd be happy to
              hear from you.
            </p>
          </div>
        </section>

        {/* CONTACT CONTENT */}
        <section className="px-5 py-16 md:py-24">
          <div className="mx-auto grid max-w-[1090px] grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">

            {/* LEFT COLUMN */}
            <div className="space-y-5">
              <div className="mb-7">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Reach Our Team
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 md:text-base">
                  Whether you're a student looking for accommodation,
                  a property owner with a question, or simply curious
                  about what we do, send us a message.
                </p>
              </div>

              <ContactCard icon="email" title="Email Us">
                <a
                  href="mailto:info@resisure.co.za"
                  className="break-all text-base font-medium text-[#087CFF] hover:underline"
                >
                  info@resisure.co.za
                </a>
                <p className="mt-1 text-xs text-slate-400">
                  Proposed contact address — inbox activation is still required.
                </p>
              </ContactCard>

              <ContactCard
                icon="whatsapp"
                title="WhatsApp"
                iconColor="text-green-600"
              >
                <p className="font-medium text-slate-700">
                  WhatsApp support is coming soon.
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Our official contact number will be added before launch.
                </p>
              </ContactCard>

              <div className="rounded-[22px] border border-slate-100 bg-white p-6">
                <p className="text-sm leading-7 text-slate-500">
                  We aim to respond to enquiries as soon as possible.
                  Thank you for your patience while our team reviews
                  your message.
                </p>
              </div>

              <div className="rounded-[22px] border border-orange-200 bg-orange-50 p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">
                    <ContactIcon type="notice" />
                  </span>

                  <p className="text-sm leading-6 text-slate-700">
                    <strong className="text-slate-900">
                      Accommodation enquiry?
                    </strong>{" "}
                    Include the property name and relevant details in
                    your message so we can better understand your query.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - FORM */}
            <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm sm:p-8 md:p-9">
              <div className="mb-7">
                <h2 className="text-xl font-bold text-slate-900">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Complete the form below and tell us how we can assist.
                </p>
              </div>

              {submitted && (
                <div
                  role="status"
                  className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
                >
                  <strong>Thank you for contacting ResiSure!</strong>
                  <br />
                  Your form has passed the demo validation. Message delivery
                  is not yet enabled, so please note that nothing has been
                  emailed to our team.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* NAME */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-slate-800"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={50}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass("name")}
                  />

                  <div className="mt-1 flex justify-between gap-3">
                    {errors.name ? (
                      <p id="name-error" className="text-xs text-red-600">
                        {errors.name}
                      </p>
                    ) : (
                      <span className="text-xs text-slate-400">
                        2–50 characters
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      {form.name.length}/50
                    </span>
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-slate-800"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass("email")}
                  />

                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* CATEGORY */}
                <div>
                  <label
                    htmlFor="contact-category"
                    className="text-sm font-medium text-slate-800"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="contact-category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={
                      errors.category ? "category-error" : undefined
                    }
                    className={inputClass("category")}
                  >
                    <option value="">Select an enquiry category</option>
                    <option value="Student Support">Student Support</option>
                    <option value="Landlord Support">Landlord Support</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>

                  {errors.category && (
                    <p
                      id="category-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-medium text-slate-800"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>

                    <span className="text-xs text-slate-400">
                      {form.message.length}/1000
                    </span>
                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={1000}
                    rows={6}
                    placeholder="Tell us how we can help..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${inputClass("message")} min-h-[150px] resize-y`}
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#087CFF] px-6 py-4 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#006BE6] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                  Send Message
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Fields marked with * are required. This form is currently
                  a frontend demonstration.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <RoomFinder />
    </div>
  );
}
