import React from "react";

export default function Footer() {
  return (
    // <!-- Footer container -->
    <footer className="bg-neutral-900 text-center text-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 lg:text-left">
      {/* <!-- Main container div --> */}
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid md:grid-cols-2 lg:grid-cols-6 items-center justify-center">
          {/* <!-- Section: Links  --> */}
          <div className="col-start-2 text-center">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-center">
              Social
            </h6>
            <p className="mb-4">Check my work</p>
            <div>
              <a
                href="https://www.linkedin.com/in/negru-dan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-xl"></i>
              </a>
              <a
                href="https://github.com/negrudan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github fa-xl ml-2"></i>
              </a>
            </div>
          </div>
          {/* <!-- Contact section --> */}
          <div className="col-end-6">
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <i className="fas fa-envelope me-3"></i>
              dan.negru2002@gmail.com
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <i className="fas fa-phone me-3"></i> (+40) 0773 307 342
            </p>
          </div>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="bg-neutral-900 p-6 text-center footer">
        <span>©2023 Copyright:</span>&nbsp;
        <a
          className="font-semibold text-neutral-600 dark:text-neutral-400 link-underline"
          href="https://negrudan.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MY PORTFOLIO
        </a>
      </div>
    </footer>
  );
}
