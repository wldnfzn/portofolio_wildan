import { MdArrowOutward, MdCopyright, MdDownload } from "./Icons";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/Contact.css";

const Contact = () => {
  const { lang } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].contact;

  return (
    <footer className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{copy.heading}</h3>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>{copy.emailLabel}</h4>
            <p>
              <a href="mailto:wildanfauzan266@gmail.com" data-cursor="disable">
                wildanfauzan266@gmail.com
              </a>
            </p>

            <h4>{copy.phoneLabel}</h4>
            <p>
              <a href="https://wa.me/6285798123370" target="_blank" rel="noreferrer" data-cursor="disable">
                +62 857-9812-3370
              </a>
            </p>

            <h4>{copy.locationLabel}</h4>
            <p className="contact-static">Bandung, Jawa Barat, Indonesia</p>
          </div>

          <div className="contact-box">
            <h4>{copy.socialLabel}</h4>
            <a
              href="https://github.com/wldnfzn"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/wildan-fauzan-02056a275/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/musicsociety.utb/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>

            <h4 className="cv-heading">{copy.cvSectionLabel}</h4>
            <div className="contact-cv-buttons">
              <a
                href="/CV_Wildan_Fauzan_EN.pdf"
                target="_blank"
                rel="noreferrer"
                className="cv-pill"
                data-cursor="disable"
              >
                <MdDownload /> {copy.cvEnLabel}
              </a>
              <a
                href="/CV_Wildan_Fauzan_ID.pdf"
                target="_blank"
                rel="noreferrer"
                className="cv-pill"
                data-cursor="disable"
              >
                <MdDownload /> {copy.cvIdLabel}
              </a>
            </div>
          </div>

          <div className="contact-box contact-box-end">
            <h4>{copy.educationLabel}</h4>
            <p className="contact-static">{copy.educationValue}</p>
            <h2>
              {copy.creditPrefix} <br />
              <span>{copy.creditName}</span>
            </h2>
            <h5>
              <MdCopyright /> {copy.year}
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
