import { useState } from "react";

// กติกาโครงการ 60:40
const STATE_RATE = 0.6;   // รัฐออก 60%
const SELF_RATE = 0.4;    // จ่ายเอง 40%
const DAILY_CAP = 200;    // เพดานสิทธิรัฐ/วัน (ส่วน 60%)
const SPEND_CAP = DAILY_CAP / STATE_RATE; // ใช้สิทธิเต็มได้ = 333.33/วัน

const LOGO =
  "data:image/jpeg;base64,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";
const FB_URL = "https://www.facebook.com/momentswithclaude";

const baht = (n) =>
  (Math.round((n || 0) * 100) / 100).toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const num = (v) => (v === "" || v == null ? 0 : Number(v));

export default function App() {
  const [tab, setTab] = useState("single");

  const tabs = [
    { id: "single", label: "คำนวณเดี่ยว" },
    { id: "remaining", label: "เช็คสิทธิเหลือ" },
    { id: "split", label: "แบ่งหลายคน" },
  ];

  return (
    <div className="min-h-screen w-full bg-stone-100 py-8 px-4 flex justify-center text-stone-800">
      <div className="w-full max-w-md">
        <header className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            คำนวณไทยช่วยไทยพลัส 60:40
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            รัฐช่วย 60% · จ่ายเอง 40% · สิทธิรัฐสูงสุด ฿{DAILY_CAP}/วัน
            (ใช้ได้รวม ฿{baht(SPEND_CAP)}/วัน)
          </p>
        </header>

        <div className="flex gap-1 mb-4 rounded-xl bg-stone-200 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                tab === t.id
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "single" && <SingleCalc />}
        {tab === "remaining" && <RemainingCalc />}
        {tab === "split" && <SplitCalc />}

        <Footer />
      </div>
    </div>
  );
}

/* ── บล็อก 1: ยอดรายวัน — ใส่ราคา → รัฐออก/จ่ายเอง ── */
function SingleCalc() {
  const [price, setPrice] = useState(200);
  const p = num(price);
  const overCap = p * STATE_RATE > DAILY_CAP;
  const state = overCap ? DAILY_CAP : p * STATE_RATE;
  const self = overCap ? p - DAILY_CAP : p * SELF_RATE;

  return (
    <div className="space-y-4">
      <Card>
        <Field label="ราคาสินค้า" value={price} onChange={setPrice} big />
      </Card>

      <div className="grid grid-cols-3 gap-2">
        <Stat label="รัฐออก" value={state} tone="state" />
        <Stat label="จ่ายเอง" value={self} tone="self" />
        <Stat label="ยอดรวม" value={state + self} tone="neutral" />
      </div>

      <div className="rounded-2xl bg-stone-900 text-stone-100 p-5 text-sm">
        <div className="flex justify-between mb-2">
          <span className="text-stone-400">ใช้สิทธิรัฐไป</span>
          <span className="tabular-nums">
            ฿{baht(state)} / {DAILY_CAP}
          </span>
        </div>
        <div className="h-2 rounded-full bg-stone-700 overflow-hidden">
          <div
            className="h-full bg-emerald-400"
            style={{ width: `${Math.min(100, (state / DAILY_CAP) * 100)}%` }}
          />
        </div>
        {overCap && (
          <p className="mt-3 text-xs text-rose-300">
            ราคาเกิน ฿{baht(SPEND_CAP)} → สิทธิรัฐเต็มเพดาน ส่วนเกินจ่ายเต็มจำนวน
          </p>
        )}
      </div>
    </div>
  );
}

/* ── บล็อก 2: สิทธิคงเหลือ — ใส่สิทธิเหลือ → ซื้อได้อีก/จ่ายเอง ── */
function RemainingCalc() {
  const [right, setRight] = useState(150);
  const r = Math.min(num(right), DAILY_CAP);
  const spendable = r / STATE_RATE;
  const self = spendable * SELF_RATE;

  return (
    <div className="space-y-4">
      <Card>
        <Field
          label="สิทธิรัฐคงเหลือวันนี้"
          value={right}
          onChange={setRight}
          max={DAILY_CAP}
          big
        />
        <p className="mt-2 text-xs text-stone-400">สูงสุด ฿{DAILY_CAP}/วัน</p>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <Stat label="ซื้อได้อีก (รวม)" value={spendable} tone="state" />
        <Stat label="จ่ายเอง" value={self} tone="self" />
      </div>

      <p className="text-center text-xs text-stone-500">
        เหลือสิทธิ ฿{baht(r)} → ซื้อของได้อีกรวม ฿{baht(spendable)} โดยจ่ายเอง ฿
        {baht(self)}
      </p>
    </div>
  );
}

/* ── บล็อก 3–4 (N คน): เติมทีละคนตามลำดับ ── */
function SplitCalc() {
  const [bill, setBill] = useState(750);
  const [people, setPeople] = useState([
    { id: 1, right: 150 },
    { id: 2, right: 150 },
    { id: 3, right: 150 },
  ]);

  let remaining = Math.max(0, num(bill));
  const rows = people.map((pp) => {
    const right = Math.min(Math.max(0, num(pp.right)), DAILY_CAP);
    const capacity = right / STATE_RATE;
    const portion = Math.min(remaining, capacity);
    remaining -= portion;
    return {
      ...pp,
      portion,
      state: portion * STATE_RATE,
      self: portion * SELF_RATE,
    };
  });
  const excess = remaining;
  const overBudget = excess > 0.005;
  const lastIdx = rows.length - 1;
  const totalCapacity = people.reduce(
    (s, p) => s + Math.min(Math.max(0, num(p.right)), DAILY_CAP) / STATE_RATE,
    0
  );
  const totalState = rows.reduce((s, r) => s + r.state, 0);
  const totalSelf = rows.reduce((s, r) => s + r.self, 0) + excess;

  const setRight = (id, v) =>
    setPeople((ps) =>
      ps.map((p) => (p.id === id ? { ...p, right: v === "" ? "" : Number(v) } : p))
    );
  const addPerson = () =>
    setPeople((ps) => [...ps, { id: (ps.at(-1)?.id || 0) + 1, right: DAILY_CAP }]);
  const removePerson = (id) =>
    setPeople((ps) => (ps.length > 1 ? ps.filter((p) => p.id !== id) : ps));

  return (
    <div className="space-y-4">
      <Card>
        <Field label="ราคาบิลรวม" value={bill} onChange={setBill} big />
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-stone-400">ความจุสิทธิรวมทั้งกลุ่ม</span>
          <span className="tabular-nums font-medium text-stone-600">
            ฿{baht(totalCapacity)}
          </span>
        </div>
        {overBudget && (
          <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
            บิลเกินสิทธิรวม ฿{baht(excess)} — ส่วนนี้จ่ายต็มจำนวน (คนสุดท้ายจ่ายส่วนเกินสิทธิ)
          </p>
        )}
      </Card>

      <div className="space-y-3">
        {rows.map((r, i) => (
          <div
            key={r.id}
            className="rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-stone-700">
                คนที่ {i + 1}
              </span>
              <button
                onClick={() => removePerson(r.id)}
                disabled={rows.length === 1}
                className="text-xs text-stone-400 hover:text-rose-600 disabled:opacity-30"
              >
                ลบ
              </button>
            </div>

            <Field
              label="สิทธิเหลือ"
              value={r.right}
              onChange={(v) => setRight(r.id, v)}
              max={DAILY_CAP}
              inline
            />

            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat label="รับภาระบิล" value={r.portion} tone="neutral" small />
              <Stat label="รัฐออก" value={r.state} tone="state" small />
              <Stat
                label="จ่ายเอง"
                value={r.self + (overBudget && i === lastIdx ? excess : 0)}
                tone="self"
                small
                note={
                  overBudget && i === lastIdx
                    ? `รวมเกินสิทธิ ฿${baht(excess)}`
                    : null
                }
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addPerson}
        className="w-full rounded-xl border border-dashed border-stone-300 py-2.5 text-sm font-medium text-stone-500 hover:border-stone-400 hover:text-stone-700"
      >
        + เพิ่มคน
      </button>

      <div className="rounded-2xl bg-stone-900 text-stone-100 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-stone-400 mb-3">
          สรุปการแบ่งจ่าย
        </h2>
        <dl className="space-y-2 text-sm">
          <Line label="รัฐช่วยรวม" value={totalState} accent="emerald" />
          <Line label="จ่ายเองรวม" value={totalSelf} />
          {overBudget && (
            <Line label="— ในนั้นเป็นส่วนเกินสิทธิ" value={excess} muted />
          )}
          <div className="border-t border-dashed border-stone-700 pt-2 mt-2 flex justify-between">
            <dt className="font-semibold">ยอดบิลรวม</dt>
            <dd className="font-bold tabular-nums text-lg">
              ฿{baht(totalState + totalSelf)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ── ส่วนประกอบย่อย ── */
function Card({ children }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 p-5">
      {children}
    </div>
  );
}

function Field({ label, value, onChange, max, big, inline }) {
  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <label className="text-xs text-stone-500 whitespace-nowrap flex-1">
          {label}
        </label>
        <div className="flex items-baseline rounded-lg bg-stone-50 px-2 py-1 ring-1 ring-stone-200">
          <span className="text-xs text-stone-400">฿</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 bg-transparent text-right text-sm font-semibold tabular-nums outline-none"
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <label className="block text-xs font-medium uppercase tracking-wide text-stone-400">
        {label}
      </label>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-stone-400">฿</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-transparent ${
            big ? "text-3xl" : "text-xl"
          } font-bold tabular-nums text-stone-900 outline-none`}
        />
      </div>
    </>
  );
}

function Stat({ label, value, tone, note, small }) {
  const color =
    tone === "state"
      ? "text-emerald-600"
      : tone === "self"
      ? "text-stone-900"
      : "text-stone-500";
  return (
    <div className="rounded-lg bg-white ring-1 ring-stone-200 py-3 px-2 text-center">
      <div className="text-[10px] uppercase tracking-wide text-stone-400">
        {label}
      </div>
      <div className={`${small ? "text-sm" : "text-lg"} font-bold tabular-nums ${color}`}>
        ฿{baht(value)}
      </div>
      {note && <div className="text-[9px] text-rose-500 mt-0.5">{note}</div>}
    </div>
  );
}

function Line({ label, value, accent, muted }) {
  return (
    <div className="flex justify-between">
      <dt className={muted ? "text-stone-500 text-xs pl-2" : "text-stone-300"}>
        {label}
      </dt>
      <dd
        className={`tabular-nums ${
          accent === "emerald"
            ? "text-emerald-400 font-medium"
            : muted
            ? "text-stone-500 text-xs"
            : "font-medium"
        }`}
      >
        ฿{baht(value)}
      </dd>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-8 pb-2">
      <a
        href={FB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-3 rounded-2xl bg-white/70 ring-1 ring-stone-200 py-3 px-4 transition hover:bg-white hover:ring-stone-300"
      >
        <img
          src={LOGO}
          alt="Moments with Claude"
          className="h-9 w-9 rounded-full object-cover ring-1 ring-stone-200"
        />
        <div className="leading-tight text-left">
          <div className="text-[10px] uppercase tracking-wide text-stone-400">
            Powered by
          </div>
          <div className="text-sm font-semibold text-stone-700 group-hover:text-stone-900">
            Moments with Claude
          </div>
        </div>
      </a>
    </footer>
  );
}
