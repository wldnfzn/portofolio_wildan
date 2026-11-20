import { useMemo, useState } from "react";
import { Lang } from "../../context/AppContext";

type SwordRole = "SALES" | "CCL" | "WAREHOUSE" | "MECHANIC";
type PartStatus = "PENDING_CCL" | "SUBMITTED" | "READY" | "COMPLETED";
type CheckValue = "OK" | "WARN" | "CRIT";

interface CheckItem {
  id: string;
  labelEn: string;
  labelId: string;
  status: CheckValue;
}

const INITIAL_CHECKS: CheckItem[] = [
  { id: "mast", labelEn: "Mast & Lift Chains", labelId: "Mast & Rantai Angkat", status: "OK" },
  { id: "hydro", labelEn: "Hydraulic Hose & Seals", labelId: "Selang & Seal Hidrolik", status: "WARN" },
  { id: "batt", labelEn: "Traction Battery 48V", labelId: "Baterai Traksi 48V", status: "OK" },
  { id: "brake", labelEn: "Service Brake & Steering", labelId: "Rem Utama & Kemudi", status: "OK" },
  { id: "safety", labelEn: "Beacon, Horn & Fork Lock", labelId: "Lampu Rotary, Klakson & Garpu", status: "OK" },
];

const COPY = {
  EN: {
    roles: {
      SALES: "Sales",
      CCL: "CCL / Manager",
      WAREHOUSE: "Warehouse (TCL)",
      MECHANIC: "Mechanic (Mobile)",
    },
    reset: "Reset Demo",
    unitLabel: "Demo Unit",
    stockLabel: "Warehouse Stock",
    woLabel: "Work Order",
    partLabel: "Sparepart Flow",
    salesTitle: "Create Breakdown Ticket (Dummy)",
    customerLbl: "Dummy Client",
    issueLbl: "Reported Symptom",
    issueDefault: "Mast hydraulic slower under 1.5T load + minor oil weep",
    partNeeded: "Requested Part: Seal Kit Hydraulic Lift (1 pc)",
    submitTicket: "Submit Ticket to CCL",
    ticketCreated: "Ticket queued to CCL approval table.",
    cclTitle: "CCL Queue: Assign Team & Approve Part",
    assignApprove: "Assign Mechanic & Approve Part",
    alreadyApproved: "Approved & routed to Warehouse (TCL).",
    noTicket: "Create a ticket from Sales tab or continue seeded WO-2026-088.",
    whTitle: "Warehouse Stock & 4-Digit PIN Release",
    generatePin: "Prepare Part & Generate 4-Digit PIN",
    pinIssued: "Active Pickup PIN (share to Mechanic):",
    waitingCcl: "Waiting for CCL sparepart approval (currently PENDING_CCL).",
    completedWh: "Part handed off. Idempotent lock prevents duplicate stock deduction.",
    mechTitle: "Mechanic Mobile App Simulation",
    scanQr: "Scan Unit QR (FL-DEMO-08)",
    qrDone: "QR Verified · FL-DEMO-08 · Gudang Cikarang A",
    pinInputLabel: "Enter Warehouse 4-Digit PIN to Pick Up Seal Kit:",
    confirmPickup: "Verify PIN & Confirm Pickup",
    fillPin: "Use PIN",
    pinError: "Invalid 4-digit PIN. Check Warehouse (TCL) tab.",
    partDone: "Pickup verified! Warehouse stock atomically deducted (-1).",
    nextWarehousePrefix: "Next step: switch to",
    nextWarehouseSuffix: "to prepare stock & issue PIN.",
    nextMechPrefix: "Next step: switch to",
    nextMechMiddle: "and enter PIN",
    partWaitPrefix: "Sparepart status:",
    partWaitHint: "(Complete CCL & Warehouse steps first)",
    checklistTitle: "Inspection Health Score (Live Simulation)",
    submitInspect: "Submit Inspection Report",
    inspectDone: "Report submitted to Dashboard & Snapshot saved.",
  },
  ID: {
    roles: {
      SALES: "Sales",
      CCL: "CCL / Manager",
      WAREHOUSE: "Gudang (TCL)",
      MECHANIC: "Mekanik (Mobile)",
    },
    reset: "Reset Demo",
    unitLabel: "Unit Demo",
    stockLabel: "Stok Gudang",
    woLabel: "Work Order",
    partLabel: "Alur Sparepart",
    salesTitle: "Buat Tiket Kerusakan (Dummy)",
    customerLbl: "Klien Dummy",
    issueLbl: "Keluhan Lapangan",
    issueDefault: "Hidrolik mast lambat saat beban 1.5T + rembesan oli tipis",
    partNeeded: "Usulan Part: Seal Kit Hydraulic Lift (1 pcs)",
    submitTicket: "Kirim Tiket ke Antrean CCL",
    ticketCreated: "Tiket masuk antrean persetujuan CCL.",
    cclTitle: "Antrean CCL: Tugaskan Mekanik & Setujui Part",
    assignApprove: "Tugaskan Mekanik & Approve Part",
    alreadyApproved: "Sudah disetujui & diteruskan ke Gudang (TCL).",
    noTicket: "Buat tiket dari tab Sales atau lanjutkan WO-2026-088.",
    whTitle: "Stok Gudang & Rilis PIN 4-Digit",
    generatePin: "Siapkan Part & Buat PIN 4-Digit",
    pinIssued: "PIN Pengambilan Aktif (berikan ke Mekanik):",
    waitingCcl: "Menunggu persetujuan CCL (status masih PENDING_CCL).",
    completedWh: "Part diserahkan. Kunci idempoten mencegah potong stok ganda.",
    mechTitle: "Simulasi Aplikasi Mobile Mekanik",
    scanQr: "Scan QR Unit (FL-DEMO-08)",
    qrDone: "QR Terverifikasi · FL-DEMO-08 · Gudang Cikarang A",
    pinInputLabel: "Masukkan PIN 4-Digit Gudang untuk Ambil Seal Kit:",
    confirmPickup: "Verifikasi PIN & Ambil Part",
    fillPin: "Isi PIN",
    pinError: "PIN 4-digit salah. Lihat PIN aktif di tab Gudang (TCL).",
    partDone: "Serah terima sah! Stok gudang terpotong atomik (-1).",
    nextWarehousePrefix: "Langkah berikut: pindah ke tab",
    nextWarehouseSuffix: "untuk menyiapkan stok & membuat PIN.",
    nextMechPrefix: "Langkah berikut: pindah ke tab",
    nextMechMiddle: "lalu masukkan PIN",
    partWaitPrefix: "Status sparepart:",
    partWaitHint: "(Selesaikan tahap CCL & Gudang lebih dulu)",
    checklistTitle: "Skor Kesehatan Inspeksi (Simulasi Live)",
    submitInspect: "Kirim Laporan Inspeksi",
    inspectDone: "Laporan terkirim ke Dashboard & snapshot tersimpan.",
  },
};

export const SwordSandbox = ({ lang }: { lang: Lang }) => {
  const t = COPY[lang];
  const [role, setRole] = useState<SwordRole>("CCL");
  const [woCode, setWoCode] = useState("WO-2026-088");
  const [issueText, setIssueText] = useState(t.issueDefault);
  const [ticketSubmitted, setTicketSubmitted] = useState(true);
  const [woAssigned, setWoAssigned] = useState(false);
  const [partStatus, setPartStatus] = useState<PartStatus>("PENDING_CCL");
  const [stock, setStock] = useState(5);
  const [generatedPin, setGeneratedPin] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [checks, setChecks] = useState<CheckItem[]>(INITIAL_CHECKS);
  const [inspectionSent, setInspectionSent] = useState(false);

  const { score, healthTier } = useMemo(() => {
    const hasCrit = checks.some((c) => c.status === "CRIT");
    const deductions = checks.reduce(
      (acc, c) => acc + (c.status === "WARN" ? 15 : c.status === "CRIT" ? 35 : 0),
      0
    );
    const val = Math.max(10, 100 - deductions);
    const tier =
      hasCrit || val < 50 ? "CRITICAL" : val < 80 ? "ATTENTION" : "HEALTHY";
    return { score: val, healthTier: tier };
  }, [checks]);

  const handleReset = () => {
    setRole("SALES");
    setWoCode("WO-2026-089");
    setIssueText(t.issueDefault);
    setTicketSubmitted(true);
    setWoAssigned(false);
    setPartStatus("PENDING_CCL");
    setStock(5);
    setGeneratedPin(null);
    setPinInput("");
    setPinError(false);
    setQrScanned(false);
    setChecks(INITIAL_CHECKS);
    setInspectionSent(false);
  };

  const handleCreateTicket = () => {
    setWoCode("WO-2026-089");
    setTicketSubmitted(true);
    setWoAssigned(false);
    setPartStatus("PENDING_CCL");
    setGeneratedPin(null);
    setPinInput("");
    setPinError(false);
    setInspectionSent(false);
    setRole("CCL");
  };

  const handleCclApprove = () => {
    setWoAssigned(true);
    if (partStatus === "PENDING_CCL") {
      setPartStatus("SUBMITTED");
    }
  };

  const handleGeneratePin = () => {
    if (partStatus !== "SUBMITTED") return;
    setGeneratedPin("4829");
    setPartStatus("READY");
    setPinError(false);
  };

  const handleConfirmPickup = () => {
    if (partStatus !== "READY" || !generatedPin) return;
    if (pinInput.trim() !== generatedPin) {
      setPinError(true);
      return;
    }
    setPinError(false);
    setPartStatus("COMPLETED");
    setStock((prev) => Math.max(0, prev - 1));
  };

  const updateCheck = (id: string, status: CheckValue) => {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    setInspectionSent(false);
  };

  return (
    <div className="sb-container">
      {/* Live telemetry bar */}
      <div className="sb-telemetry">
        <div className="sb-stat">
          <span>{t.unitLabel}</span>
          <strong>FL-DEMO-08 (2.0T)</strong>
        </div>
        <div className="sb-stat">
          <span>{t.woLabel}</span>
          <strong>{woCode} · {inspectionSent ? "INSPECTED" : woAssigned ? "ASSIGNED" : "OPEN"}</strong>
        </div>
        <div className="sb-stat">
          <span>{t.partLabel}</span>
          <strong className={`sb-pill sb-pill-${partStatus.toLowerCase()}`}>{partStatus}</strong>
        </div>
        <div className="sb-stat">
          <span>{t.stockLabel}</span>
          <strong>Seal Kit: {stock} pcs</strong>
        </div>
        <button type="button" className="sb-reset-btn" onClick={handleReset}>
          {t.reset}
        </button>
      </div>

      {/* Role Switcher */}
      <div className="sb-role-tabs" role="tablist" aria-label="SWORD Roles">
        {(["SALES", "CCL", "WAREHOUSE", "MECHANIC"] as SwordRole[]).map((r) => (
          <button
            key={r}
            type="button"
            role="tab"
            aria-selected={role === r}
            className={`sb-role-tab ${role === r ? "active" : ""}`}
            onClick={() => setRole(r)}
          >
            {t.roles[r]}
          </button>
        ))}
      </div>

      {/* Role Panel */}
      <div className="sb-panel">
        {role === "SALES" && (
          <div className="sb-card">
            <h4>{t.salesTitle}</h4>
            <div className="sb-field-grid">
              <div className="sb-field">
                <label>{t.customerLbl}</label>
                <input type="text" value="PT. Logistik Nusantara (Demo) — Gudang Cikarang A" readOnly />
              </div>
              <div className="sb-field">
                <label>{t.issueLbl}</label>
                <input
                  type="text"
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                />
              </div>
            </div>
            <p className="sb-muted">{t.partNeeded}</p>
            <button type="button" className="sb-primary-btn" onClick={handleCreateTicket}>
              {t.submitTicket}
            </button>
            {ticketSubmitted && <p className="sb-success">{t.ticketCreated}</p>}
          </div>
        )}

        {role === "CCL" && (
          <div className="sb-card">
            <h4>{t.cclTitle}</h4>
            {!ticketSubmitted ? (
              <p className="sb-muted">{t.noTicket}</p>
            ) : (
              <>
                <div className="sb-row-box">
                  <div>
                    <strong>{woCode}</strong> · PT. Logistik Nusantara (Demo)
                    <div className="sb-sub">{issueText}</div>
                    <div className="sb-sub">Sparepart: Seal Kit Hydraulic Lift (1 pc) · Status: <b>{partStatus}</b></div>
                  </div>
                  {partStatus === "PENDING_CCL" ? (
                    <button type="button" className="sb-primary-btn" onClick={handleCclApprove}>
                      {t.assignApprove}
                    </button>
                  ) : (
                    <span className="sb-badge-ok">{t.alreadyApproved}</span>
                  )}
                </div>
                {partStatus !== "PENDING_CCL" && (
                  <p className="sb-hint">
                    {t.nextWarehousePrefix} <b>{t.roles.WAREHOUSE}</b> {t.nextWarehouseSuffix}
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {role === "WAREHOUSE" && (
          <div className="sb-card">
            <h4>{t.whTitle}</h4>
            <div className="sb-row-box">
              <div>
                <strong>Seal Kit Hydraulic Lift</strong> · {woCode}
                <div className="sb-sub">{t.stockLabel}: <b>{stock} pcs</b> · Status: <b>{partStatus}</b></div>
              </div>
              {partStatus === "PENDING_CCL" && (
                <span className="sb-badge-warn">{t.waitingCcl}</span>
              )}
              {partStatus === "SUBMITTED" && (
                <button type="button" className="sb-primary-btn" onClick={handleGeneratePin}>
                  {t.generatePin}
                </button>
              )}
              {partStatus === "READY" && generatedPin && (
                <div className="sb-pin-box">
                  <span>{t.pinIssued}</span>
                  <strong>{generatedPin}</strong>
                </div>
              )}
              {partStatus === "COMPLETED" && (
                <span className="sb-badge-ok">{t.completedWh}</span>
              )}
            </div>
            {partStatus === "READY" && (
              <p className="sb-hint">
                {t.nextMechPrefix} <b>{t.roles.MECHANIC}</b> {t.nextMechMiddle} <b>{generatedPin}</b>.
              </p>
            )}
          </div>
        )}

        {role === "MECHANIC" && (
          <div className="sb-mobile-shell">
            <div className="sb-mobile-header">
              <span>SWORD Field · Mechanic App (Andi Dummy)</span>
              <span className={`sb-health-badge sb-health-${healthTier.toLowerCase()}`}>
                {score}% {healthTier}
              </span>
            </div>

            {/* Step 1: QR Check-In */}
            <div className="sb-mobile-block">
              <div className="sb-mobile-row">
                <span>1. QR Check-in</span>
                {!qrScanned ? (
                  <button type="button" className="sb-small-btn" onClick={() => setQrScanned(true)}>
                    {t.scanQr}
                  </button>
                ) : (
                  <span className="sb-badge-ok">{t.qrDone}</span>
                )}
              </div>
            </div>

            {/* Step 2: 4-Digit PIN Pickup */}
            <div className="sb-mobile-block">
              <div className="sb-mobile-label">2. {t.pinInputLabel}</div>
              {partStatus === "COMPLETED" ? (
                <p className="sb-success">{t.partDone}</p>
              ) : partStatus !== "READY" ? (
                <p className="sb-muted">
                  {t.partWaitPrefix} <b>{partStatus}</b> {t.partWaitHint}
                </p>
              ) : (
                <div className="sb-pin-entry">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="PIN (4829)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                  />
                  {generatedPin && (
                    <button
                      type="button"
                      className="sb-ghost-btn"
                      onClick={() => {
                        setPinInput(generatedPin);
                        setPinError(false);
                      }}
                    >
                      {t.fillPin}
                    </button>
                  )}
                  <button type="button" className="sb-primary-btn" onClick={handleConfirmPickup}>
                    {t.confirmPickup}
                  </button>
                </div>
              )}
              {pinError && <p className="sb-error">{t.pinError}</p>}
            </div>

            {/* Step 3: Live Checklist Scoring */}
            <div className="sb-mobile-block">
              <div className="sb-mobile-label">3. {t.checklistTitle}</div>
              <div className="sb-check-list">
                {checks.map((item) => (
                  <div key={item.id} className="sb-check-item">
                    <span>{lang === "EN" ? item.labelEn : item.labelId}</span>
                    <div className="sb-check-btns">
                      {(["OK", "WARN", "CRIT"] as CheckValue[]).map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`sb-chk-${val.toLowerCase()} ${item.status === val ? "active" : ""}`}
                          onClick={() => updateCheck(item.id, val)}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="sb-mobile-footer">
                <button
                  type="button"
                  className="sb-primary-btn"
                  onClick={() => {
                    if (!qrScanned) setQrScanned(true);
                    setWoAssigned(true);
                    setInspectionSent(true);
                  }}
                >
                  {t.submitInspect}
                </button>
                {inspectionSent && <span className="sb-success">{t.inspectDone}</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
