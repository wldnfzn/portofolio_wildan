import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const { lang } = useAppContext();
  const copy = PORTFOLIO_DATA[lang].whatIDo;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="whatIDO" id="whatido">
      <div className="what-box">
        <h2 className="title">
          {copy.headingTop}
          <span className="hat-h2">{copy.headingMid}</span>
          <div>
            {copy.headingLine2Prefix}
            <span className="do-h2">{copy.headingAccent}</span>
          </div>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          {copy.cards.map((card, idx) => {
            const isActive = activeIndex === idx;
            const isSibling = activeIndex !== null && activeIndex !== idx;
            return (
              <div
                key={idx}
                className={`what-content what-noTouch ${
                  isActive ? "what-content-active" : ""
                } ${isSibling ? "what-sibling" : ""}`}
                onClick={() => handleToggle(idx)}
              >
                <div className="what-border1">
                  <svg height="100%">
                    {idx === 0 && (
                      <line
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="0"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="6,6"
                      />
                    )}
                    <line
                      x1="0"
                      y1="100%"
                      x2="100%"
                      y2="100%"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                    />
                  </svg>
                </div>
                <div className="what-corner"></div>

                <div className="what-content-in">
                  <h3>{card.title}</h3>
                  <h4>{card.subtitle}</h4>
                  <p>{card.description}</p>
                  <h5>{copy.skillHeading}</h5>
                  <div className="what-content-flex">
                    {card.tags.map((tag, tIdx) => (
                      <div className="what-tags" key={tIdx}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="what-arrow"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
