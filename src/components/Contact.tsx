"use client";

import { memo } from "react";

const Contact = memo(() => {
  return (
    <section
      id="contact"
      className="bg-white rounded-[16px] shadow-sm dark:bg-gray-900 m-4 mb-4"
    >
      <div className="w-full max-w-screen-xl mx-auto p-8 md:py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h2>
          <div className="h-1 w-24 bg-gradient-accent mx-auto mb-6" />
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-4 text-center">
            <svg
              className="w-8 h-8 text-[#d742a5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Email icon"
            >
              <title>Email</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href="mailto:management@klaudia-maria.pl"
              className="text-xl md:text-2xl font-medium text-gray-700 hover:text-[#d742a5] transition-colors duration-300 dark:text-gray-300 dark:hover:text-[#d742a5]"
            >
              management@klaudia-maria.pl
            </a>
          </div>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center">
            Zapraszam do kontaktu w sprawach współpracy, koncertów i projektów
            muzycznych.
          </p>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
