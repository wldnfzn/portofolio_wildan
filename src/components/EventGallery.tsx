import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "../context/AppContext";
import { EventCategory, PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/EventGallery.css";

const EventGallery = () => {
  const { lang } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].events;
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? copy.items
      : copy.items.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [activeCategory, lang]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  return (
    <section className="events-section section-container" id="events">
      <div className="events-header">
        <div>
          <h2>
            {copy.headingLead}
            <span>{copy.headingAccent}</span>
          </h2>
          <p className="events-subtitle">{copy.subtitle}</p>
        </div>

        <div className="events-filters" data-cursor="disable">
          {copy.categories.map((cat) => {
            const count =
              cat.key === "all"
                ? copy.items.length
                : copy.items.filter((i) => i.category === cat.key).length;
            return (
              <button
                key={cat.key}
                type="button"
                className={`events-filter-btn ${
                  activeCategory === cat.key ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setLightboxIndex(null);
                }}
              >
                {cat.label} <span>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="events-grid">
        {filteredItems.map((item, idx) => (
          <button
            type="button"
            key={item.id}
            className="event-card"
            onClick={() => setLightboxIndex(idx)}
            data-cursor="disable"
          >
            <div className="event-card-media">
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="event-card-badge">{item.categoryLabel}</span>
            </div>
            <div className="event-card-body">
              <div className="event-card-meta">
                <span>{item.role}</span>
                <span>{item.year}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {currentItem && lightboxIndex !== null && (
        <div
          className="event-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          <div
            className="event-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="event-lightbox-media">
              <img src={currentItem.image} alt={currentItem.title} />
            </div>

            <div className="event-lightbox-info">
              <div className="event-lightbox-meta">
                <span className="event-lightbox-badge">
                  {currentItem.categoryLabel}
                </span>
                <span>
                  {currentItem.role} • {currentItem.year}
                </span>
              </div>
              <h3>{currentItem.title}</h3>
              <p>{currentItem.caption}</p>

              <div className="event-lightbox-nav">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + filteredItems.length) %
                        filteredItems.length
                    )
                  }
                  aria-label="Previous photo"
                >
                  &#8592;
                </button>
                <span>
                  {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredItems.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                  }
                  aria-label="Next photo"
                >
                  &#8594;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventGallery;
