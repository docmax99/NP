import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-300 pb-4">Contact Us</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Get in touch with us!</h2>
        <p className="text-lg text-gray-600">
          We love hearing from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Email Address:</h2>
        <p className="text-lg text-gray-600">
          <strong>Email:</strong> contact@awesomewebsite.com
          <br />
          We usually respond within 24 hours. But hey, if we're coding in the zone, it might take a little longer!
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Phone Number:</h2>
        <p className="text-lg text-gray-600">
          <strong>Phone:</strong> +49 123 456 789
          <br />
          Feel free to call us during office hours (or any other time if you're lucky)!
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Office Address:</h2>
        <p className="text-lg text-gray-600">
          Our HQ is wherever the Wi-Fi is strong. But for official purposes:
          <br />
          <strong>123 Cool Street, Web City, CodeLand 54321</strong>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Social Media:</h2>
        <p className="text-lg text-gray-600">
          Want to follow us on social media? Connect with us on our channels for the latest updates, cool stuff, and behind-the-scenes coding action:
          <br />
          <strong>Twitter:</strong> @awesomewebsite
          <br />
          <strong>Instagram:</strong> @awesomewebsite_ig
          <br />
          <strong>LinkedIn:</strong> AwesomeWebsite Official
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Support:</h2>
        <p className="text-lg text-gray-600">
          For any technical issues or support, you can reach out to our support team at: 
          <br />
          <strong>Email :</strong> support@awesomewebsite.com
          <br />
          We're always here to help, even when your code refuses to compile!
        </p>
      </section>
    </div>
  );
};

export default ContactUs;
