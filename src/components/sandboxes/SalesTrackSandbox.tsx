import { useMemo, useState } from "react";
import { Lang } from "../../context/AppContext";

type SalesRole = "SALES" | "MANAGER";
type DealStage = "PROSPECT" | "NEGOTIATION" | "CLOSING";
type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

interface DealItem {
  id: string;
  client: string;
  valueM: number; // IDR millions
  stage: DealStage;
}

const INITIAL_DEALS: DealItem[] = [
  { id: "d1", client: "PT. Karya Logam (Demo)", valueM: 120, stage: "CLOSING" },
  { id: "d2", client: "PT. Agro Nusantara (Demo)", valueM: 85, stage: "NEGOTIATION" },
  { id: "d3", client: "CV. Prima Teknik (Demo)", valueM: 45, stage: "PROSPECT" },
];

const MONTHLY_TARGET_M = 250;

const COPY = {
  EN: {
    salesRole: "Sales Rep (Budi · Dummy)",
    managerRole: "Manager Oversight",
    reset: "Reset Demo",
    quotaLabel: "Monthly Global Target",
    gpsStatus: "GPS Status",
    leaveLabel: "Leave Queue",
    gpsTitle: "GPS Geofencing Attendance Check-In",
    insideBtn: "Simulate 45m (Inside <=100m)",
    outsideBtn: "Simulate 1,420m (Outside Radius)",
    insideBadge: "Within Office Geofence (45m) — Instant Check-In",
    outsideBadge: "Outside Geofence (1,420m) — Photo & Reason Required",
    reasonLabel: "Off-Site Visit Reason",
    reasonPlaceholder: "Client demo at Kawasan Industri Jababeka",
    photoLabel: "Attach Dummy Visit Photo Flag",
    checkInBtn: "Submit Attendance Check-In",
    checkInErr: "Off-site check-in requires both reason and photo evidence.",
    checkedInOk: "Check-in logged",
    crmTitle: "CRM Deal Pipeline (Advance Stage -> Update Target)",
    moveStage: "Next Stage",
    closedTag: "CLOSED",
    mgrAuditTitle: "Geofence Audit & Leave Request Approval",
    noCheckInYet: "No check-in logged yet. Test Sales Rep check-in first.",
    leaveCard: "Dummy Leave Request · Budi Santoso · 1 Day Family Leave",
    approveBtn: "Approve",
    rejectBtn: "Reject",
    pipelineSummary: "Team Deal Summary",
  },
  ID: {
    salesRole: "Sales Rep (Budi · Dummy)",
    managerRole: "Pengawasan Manager",
    reset: "Reset Demo",
    quotaLabel: "Target Global Bulanan",
    gpsStatus: "Status GPS",
    leaveLabel: "Antrean Izin",
    gpsTitle: "Check-In Absensi GPS Geofencing",
    insideBtn: "Simulasi 45m (Dalam Radius <=100m)",
    outsideBtn: "Simulasi 1.420m (Luar Radius)",
    insideBadge: "Di Dalam Geofence Kantor (45m) — Absen Langsung",
    outsideBadge: "Di Luar Radius Kantor (1.420m) — Wajib Foto & Alasan",
    reasonLabel: "Alasan Kunjungan Luar Kantor",
    reasonPlaceholder: "Demo produk di Kawasan Industri Jababeka",
    photoLabel: "Tandai Foto Bukti Kunjungan (Dummy)",
    checkInBtn: "Kirim Check-In Absensi",
    checkInErr: "Check-in luar radius wajib menyertakan alasan dan foto bukti.",
    checkedInOk: "Absensi tercatat",
    crmTitle: "Pipeline Deal CRM (Geser Tahap -> Perbarui Target)",
    moveStage: "Naik Tahap",
    closedTag: "CLOSING",
    mgrAuditTitle: "Audit Geofence & Persetujuan Pengajuan Izin",
    noCheckInYet: "Belum ada absensi. Coba check-in di tab Sales Rep dulu.",
    leaveCard: "Pengajuan Izin Dummy · Budi Santoso · 1 Hari Keperluan Keluarga",
    approveBtn: "Setujui",
    rejectBtn: "Tolak",
    pipelineSummary: "Ringkasan Pipeline Tim",
  },
};

export const SalesTrackSandbox = ({ lang }: { lang: Lang }) => {
  const t = COPY[lang];
  const [role, setRole] = useState<SalesRole>("SALES");
  const [outsideRadius, setOutsideRadius] = useState(false);
  const [reason, setReason] = useState(t.reasonPlaceholder);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [checkInError, setCheckInError] = useState(false);
  const [checkInLog, setCheckInLog] = useState<{
    distance: string;
    isOutside: boolean;
    note: string;
  } | null>(null);
  const [deals, setDeals] = useState<DealItem[]>(INITIAL_DEALS);
  const [leaveStatus, setLeaveStatus] = useState<LeaveStatus>("PENDING");

  const { closedTotalM, pct } = useMemo(() => {
    const sum = deals
      .filter((d) => d.stage === "CLOSING")
      .reduce((acc, d) => acc + d.valueM, 0);
    return {
      closedTotalM: sum,
      pct: Math.min(100, Math.round((sum / MONTHLY_TARGET_M) * 100)),
    };
  }, [deals]);

  const handleReset = () => {
    setRole("SALES");
    setOutsideRadius(false);
    setReason(t.reasonPlaceholder);
    setHasPhoto(false);
    setCheckInError(false);
    setCheckInLog(null);
    setDeals(INITIAL_DEALS);
    setLeaveStatus("PENDING");
  };

  const handleCheckIn = () => {
    if (outsideRadius && (!reason.trim() || !hasPhoto)) {
      setCheckInError(true);
      return;
    }
    setCheckInError(false);
    setCheckInLog({
      distance: outsideRadius ? "1,420m" : "45m",
      isOutside: outsideRadius,
      note: outsideRadius ? reason.trim() : "Kantor Pusat",
    });
  };

  const advanceDeal = (id: string) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const nextStage: DealStage =
          d.stage === "PROSPECT"
            ? "NEGOTIATION"
            : d.stage === "NEGOTIATION"
            ? "CLOSING"
            : "PROSPECT";
        return { ...d, stage: nextStage };
      })
    );
  };

  return (
    <div className="sb-container">
      {/* Live KPI Telemetry */}
      <div className="sb-telemetry">
        <div className="sb-stat sb-stat-wide">
          <span>
            {t.quotaLabel}: Rp {closedTotalM}M / Rp {MONTHLY_TARGET_M}M ({pct}%)
          </span>
          <div className="sb-progress-track">
            <div className="sb-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="sb-stat">
          <span>{t.gpsStatus}</span>
          <strong>
            {checkInLog
              ? `${checkInLog.distance} · ${checkInLog.isOutside ? "OFF-SITE" : "IN-OFFICE"}`
              : "WAITING"}
          </strong>
        </div>
        <div className="sb-stat">
          <span>{t.leaveLabel}</span>
          <strong className={`sb-pill sb-pill-${leaveStatus.toLowerCase()}`}>{leaveStatus}</strong>
        </div>
        <button type="button" className="sb-reset-btn" onClick={handleReset}>
          {t.reset}
        </button>
      </div>

      {/* Role Switcher */}
      <div className="sb-role-tabs" role="tablist" aria-label="SalesTrack Roles">
        <button
          type="button"
          role="tab"
          aria-selected={role === "SALES"}
          className={`sb-role-tab ${role === "SALES" ? "active" : ""}`}
          onClick={() => setRole("SALES")}
        >
          {t.salesRole}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === "MANAGER"}
          className={`sb-role-tab ${role === "MANAGER" ? "active" : ""}`}
          onClick={() => setRole("MANAGER")}
        >
          {t.managerRole}
        </button>
      </div>

      <div className="sb-panel">
        {role === "SALES" ? (
          <div className="sb-two-col">
            {/* GPS Geofencing Attendance */}
            <div className="sb-card">
              <h4>{t.gpsTitle}</h4>
              <div className="sb-toggle-pair">
                <button
                  type="button"
                  className={`sb-small-btn ${!outsideRadius ? "active" : ""}`}
                  onClick={() => {
                    setOutsideRadius(false);
                    setCheckInError(false);
                  }}
                >
                  {t.insideBtn}
                </button>
                <button
                  type="button"
                  className={`sb-small-btn ${outsideRadius ? "active" : ""}`}
                  onClick={() => {
                    setOutsideRadius(true);
                    setCheckInError(false);
                  }}
                >
                  {t.outsideBtn}
                </button>
              </div>

              <div className={outsideRadius ? "sb-badge-warn" : "sb-badge-ok"}>
                {outsideRadius ? t.outsideBadge : t.insideBadge}
              </div>

              {outsideRadius && (
                <div className="sb-field-stack">
                  <div className="sb-field">
                    <label>{t.reasonLabel}</label>
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => {
                        setReason(e.target.value);
                        setCheckInError(false);
                      }}
                    />
                  </div>
                  <label className="sb-checkbox-row">
                    <input
                      type="checkbox"
                      checked={hasPhoto}
                      onChange={(e) => {
                        setHasPhoto(e.target.checked);
                        setCheckInError(false);
                      }}
                    />
                    <span>{t.photoLabel}</span>
                  </label>
                </div>
              )}

              <button type="button" className="sb-primary-btn" onClick={handleCheckIn}>
                {t.checkInBtn}
              </button>
              {checkInError && <p className="sb-error">{t.checkInErr}</p>}
              {checkInLog && !checkInError && (
                <p className="sb-success">
                  {t.checkedInOk}: {checkInLog.distance} ({checkInLog.note})
                </p>
              )}
            </div>

            {/* CRM Deal Pipeline */}
            <div className="sb-card">
              <h4>{t.crmTitle}</h4>
              <div className="sb-deal-list">
                {deals.map((d) => (
                  <div key={d.id} className="sb-deal-row">
                    <div>
                      <strong>{d.client}</strong>
                      <div className="sb-sub">
                        Rp {d.valueM}M ·{" "}
                        <span className={`sb-stage sb-stage-${d.stage.toLowerCase()}`}>
                          {d.stage}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="sb-small-btn"
                      onClick={() => advanceDeal(d.id)}
                    >
                      {d.stage === "CLOSING" ? t.closedTag : t.moveStage}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="sb-two-col">
            <div className="sb-card">
              <h4>{t.mgrAuditTitle}</h4>
              <div className="sb-mobile-block">
                <div className="sb-mobile-label">GPS Check-In Audit</div>
                {checkInLog ? (
                  <p className={checkInLog.isOutside ? "sb-badge-warn" : "sb-badge-ok"}>
                    Budi (Dummy): {checkInLog.distance} ·{" "}
                    {checkInLog.isOutside
                      ? `OFF-SITE (${checkInLog.note})`
                      : "Verified Inside Office Radius"}
                  </p>
                ) : (
                  <p className="sb-muted">{t.noCheckInYet}</p>
                )}
              </div>

              <div className="sb-mobile-block">
                <div className="sb-mobile-label">{t.leaveCard}</div>
                <div className="sb-toggle-pair">
                  <button
                    type="button"
                    className="sb-primary-btn"
                    onClick={() => setLeaveStatus("APPROVED")}
                  >
                    {t.approveBtn}
                  </button>
                  <button
                    type="button"
                    className="sb-ghost-btn"
                    onClick={() => setLeaveStatus("REJECTED")}
                  >
                    {t.rejectBtn}
                  </button>
                </div>
              </div>
            </div>

            <div className="sb-card">
              <h4>{t.pipelineSummary}</h4>
              <div className="sb-deal-list">
                {deals.map((d) => (
                  <div key={d.id} className="sb-deal-row">
                    <div>
                      <strong>{d.client}</strong>
                      <div className="sb-sub">Rp {d.valueM}M</div>
                    </div>
                    <span className={`sb-stage sb-stage-${d.stage.toLowerCase()}`}>
                      {d.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
