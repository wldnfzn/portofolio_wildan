import { useState } from "react";
import { Lang } from "../../context/AppContext";

type MapCategory = "ALL" | "TRACTION" | "LITHIUM" | "CHARGER";

const MAP_PRODUCTS = [
  { id: "p1", cat: "TRACTION" as const, model: "MAP-DIN-560 (Demo)", spec: "48V · 560Ah · Lead-Acid DIN Cell" },
  { id: "p2", cat: "LITHIUM" as const, model: "MAP-LFP-400 (Demo)", spec: "48V · 400Ah · LiFePO4 Fast Charge" },
  { id: "p3", cat: "TRACTION" as const, model: "MAP-BS-320 (Demo)", spec: "24V · 320Ah · Reach Truck BS Series" },
  { id: "p4", cat: "CHARGER" as const, model: "MAP-HF-80A (Demo)", spec: "48V / 80A · High-Frequency Rectifier" },
];

export const MapBatterySandbox = ({ lang }: { lang: Lang }) => {
  const [cat, setCat] = useState<MapCategory>("ALL");
  const [viewport, setViewport] = useState<"DESKTOP" | "MOBILE">("DESKTOP");
  const [selectedSku, setSelectedSku] = useState(MAP_PRODUCTS[0].model);
  const [waSent, setWaSent] = useState(false);

  const isEn = lang === "EN";
  const items = cat === "ALL" ? MAP_PRODUCTS : MAP_PRODUCTS.filter((p) => p.cat === cat);

  return (
    <div className="sb-container">
      <div className="sb-telemetry">
        <div className="sb-toggle-pair">
          {(["ALL", "TRACTION", "LITHIUM", "CHARGER"] as MapCategory[]).map((c) => (
            <button
              key={c}
              type="button"
              className={`sb-small-btn ${cat === c ? "active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="sb-toggle-pair">
          <button
            type="button"
            className={`sb-small-btn ${viewport === "DESKTOP" ? "active" : ""}`}
            onClick={() => setViewport("DESKTOP")}
          >
            Desktop Frame
          </button>
          <button
            type="button"
            className={`sb-small-btn ${viewport === "MOBILE" ? "active" : ""}`}
            onClick={() => setViewport("MOBILE")}
          >
            Mobile Frame
          </button>
        </div>
      </div>

      <div className={`sb-viewport-frame ${viewport === "MOBILE" ? "is-mobile" : ""}`}>
        <div className="sb-card">
          <h4>
            {isEn ? "E-Catalog Spec Grid (Dummy Preview)" : "Grid Spek E-Catalog (Pratinjau Dummy)"}
          </h4>
          <div className={viewport === "MOBILE" ? "sb-one-col" : "sb-two-col"}>
            {items.map((item) => (
              <div
                key={item.id}
                className={`sb-deal-row ${selectedSku === item.model ? "is-selected" : ""}`}
              >
                <div>
                  <strong>{item.model}</strong>
                  <div className="sb-sub">{item.spec}</div>
                </div>
                <button
                  type="button"
                  className="sb-small-btn"
                  onClick={() => {
                    setSelectedSku(item.model);
                    setWaSent(true);
                  }}
                >
                  {isEn ? "WhatsApp RFQ" : "Tanya WA"}
                </button>
              </div>
            ))}
          </div>

          <div className="sb-wa-bar">
            <span>
              {waSent
                ? isEn
                  ? `Draft WA message ready for SKU: "${selectedSku}"`
                  : `Draf pesan WA siap untuk SKU: "${selectedSku}"`
                : isEn
                ? "Select any product card to test Floating WhatsApp RFQ routing."
                : "Pilih salah satu produk untuk mencoba alur pesan RFQ WhatsApp."}
            </span>
            <a href="https://map-battery.com" target="_blank" rel="noreferrer" className="sb-link-pill">
              map-battery.com ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const UMP_SERVICES = [
  {
    id: "rental",
    titleEn: "Forklift & Material Handling Rental",
    titleId: "Sewa Forklift & Material Handling",
    descEn: "Flexible fleet contracts backed by preventive maintenance logs inside SWORD.",
    descId: "Kontrak sewa armada fleksibel yang didukung log perawatan berkala di sistem SWORD.",
  },
  {
    id: "pm",
    titleEn: "Preventive Maintenance & Overhaul",
    titleId: "Perawatan Berkala & Overhaul",
    descEn: "Scheduled 58-point digital inspection reports with transparent health scoring.",
    descId: "Laporan inspeksi digital 58-poin terjadwal dengan skor kesehatan armada transparan.",
  },
  {
    id: "parts",
    titleEn: "Genuine Sparepart & Battery Supply",
    titleId: "Pengadaan Sparepart & Baterai Asli",
    descEn: "PIN-verified sparepart dispatch directly linked to client work orders.",
    descId: "Distribusi sparepart terverifikasi PIN yang terhubung langsung ke work order klien.",
  },
];

export const UmpProfileSandbox = ({ lang }: { lang: Lang }) => {
  const isEn = lang === "EN";
  const [activeSvc, setActiveSvc] = useState(UMP_SERVICES[0].id);
  const [unitCount, setUnitCount] = useState("5");
  const [routed, setRouted] = useState(false);

  const current = UMP_SERVICES.find((s) => s.id === activeSvc) || UMP_SERVICES[0];

  return (
    <div className="sb-container">
      <div className="sb-role-tabs">
        {UMP_SERVICES.map((svc) => (
          <button
            key={svc.id}
            type="button"
            className={`sb-role-tab ${activeSvc === svc.id ? "active" : ""}`}
            onClick={() => {
              setActiveSvc(svc.id);
              setRouted(false);
            }}
          >
            {isEn ? svc.titleEn : svc.titleId}
          </button>
        ))}
      </div>

      <div className="sb-panel">
        <div className="sb-card">
          <h4>{isEn ? current.titleEn : current.titleId}</h4>
          <p className="sb-muted">{isEn ? current.descEn : current.descId}</p>
          <div className="sb-pin-entry">
            <input
              type="number"
              min={1}
              max={100}
              value={unitCount}
              onChange={(e) => {
                setUnitCount(e.target.value);
                setRouted(false);
              }}
              aria-label={isEn ? "Fleet Unit Count" : "Jumlah Unit Armada"}
            />
            <button type="button" className="sb-primary-btn" onClick={() => setRouted(true)}>
              {isEn ? "Simulate SWORD Service Intake" : "Simulasi Intake ke SWORD"}
            </button>
          </div>
          {routed && (
            <p className="sb-success">
              {isEn
                ? `Dummy B2B inquiry routed (${unitCount} units · ${current.titleEn}) -> Ready for SWORD CCL triage.`
                : `Permintaan B2B dummy terkirim (${unitCount} unit · ${current.titleId}) -> Siap diproses di antrean CCL SWORD.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
