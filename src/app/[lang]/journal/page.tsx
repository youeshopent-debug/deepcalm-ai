"use client"

import Link from "next/link"
import { useEffect, useState, type FormEvent } from "react"

type Draft = { mood: string; note: string; next_step: string }
type Entry = Draft & { id: string; created_at: string }
const empty: Draft = { mood: "", note: "", next_step: "" }
const moods = [
  ["calm", "平静", "Calm"], ["happy", "开心", "Happy"], ["stressed", "压力大", "Stressed"],
  ["anxious", "焦虑", "Anxious"], ["low", "低落", "Low"],
]
const field = "mt-2 w-full rounded-xl border border-[#719486] bg-[#203a32] p-3 text-white"
const button = "rounded-xl bg-[#bdebd8] px-4 py-2.5 font-semibold text-[#132723] disabled:opacity-50"

export default function Journal({ params }: { params: { lang: string } }) {
  const zh = params.lang === "zh"
  const label = (cn: string, en: string) => zh ? cn : en
  const [entries, setEntries] = useState<Entry[]>([])
  const [stage, setStage] = useState<"loading" | "offline" | "email" | "code" | "journal">("loading")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [draft, setDraft] = useState<Draft>(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [more, setMore] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState("")
  const [error, setError] = useState("")

  async function request(method: string, data?: object, query = "") {
    const response = await fetch("/api/journal" + query, {
      method, cache: "no-store",
      ...(data ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) } : {}),
    })
    if (response.status === 401) {
      setEntries([])
      setEditing(null)
      setDeleting(null)
      setStage("email")
      throw Error("login")
    }
    if (!response.ok) throw Error(response.status === 429 ? "rate" : "request")
    return response.json()
  }

  async function load(offset = 0) {
    const result = await request("GET", undefined, "?offset=" + offset)
    setEntries(previous => offset ? [...previous, ...result.entries] : result.entries)
    setMore(result.more)
    setStage("journal")
  }

  useEffect(() => {
    void load().catch(e => { if (e.message !== "login") setStage("offline") })
    // Load the current session once on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function run(action: () => Promise<void>) {
    setBusy(true)
    setNotice("")
    setError("")
    try { await action() } catch (e) {
      const reason = e instanceof Error ? e.message : ""
      setError(reason === "login" ? label("请重新验证邮箱。", "Verify your email again.")
        : reason === "rate" ? label("操作太频繁，请稍后重试。", "Too many attempts. Try again later.")
        : label("操作未完成，请检查后重试。", "The action could not be completed. Please check and try again."))
    } finally { setBusy(false) }
  }

  function login(event: FormEvent) {
    event.preventDefault()
    void run(async () => {
      if (stage === "email") {
        await request("POST", { action: "otp", email })
        setStage("code")
        setNotice(label("验证码已发送，请查看邮箱。", "Code sent. Check your inbox."))
      } else {
        await request("POST", { action: "verify", email, code })
        setCode("")
        await load()
      }
    })
  }

  function save(event: FormEvent) {
    event.preventDefault()
    void run(async () => {
      const result = await request(editing ? "PATCH" : "POST", draft, editing ? "?id=" + editing : "")
      const saved: Entry = result.entries[0]
      setEntries(previous => editing ? previous.map(entry => entry.id === saved.id ? saved : entry) : [saved, ...previous])
      setDraft(empty)
      setEditing(null)
      setNotice(label("已保存", "Saved"))
    })
  }

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-24">
      <section className="space-y-5 rounded-3xl border border-[#719486] bg-[#132723] p-5 text-[#f4faf6] shadow-xl sm:p-8">
        <Link href={"/" + params.lang + "/support"} className="text-sm text-[#bdebd8] underline">{label("返回聊天", "Back to chat")}</Link>
        <h1 className="text-3xl font-bold">{label("情绪小日记", "Mood journal")}</h1>
        <p className="text-[#d6e8df]">{label("用一点时间记下今天的感受。日记不会用于 AI 聊天或海报。", "Take a moment to record how you feel. Entries are kept separate from AI chat and posters.")}</p>
        {notice && <p role="status">{notice}</p>}
        {error && <p role="alert" className="text-rose-200">{error}</p>}
        {stage === "loading" && <p role="status">{label("正在检查登录状态…", "Checking your session…")}</p>}
        {stage === "offline" && <button className={button} disabled={busy} onClick={() => void run(() => load())}>{label("日记暂不可用，重试", "Journal unavailable. Retry")}</button>}
        {(stage === "email" || stage === "code") && (
          <form onSubmit={login} className="space-y-4">
            <label className="block">{label("邮箱", "Email")}
              <input className={field} type="email" required readOnly={stage === "code"} autoComplete="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            {stage === "code" && <label className="block">{label("六位验证码", "Six-digit code")}
              <input className={field} inputMode="numeric" pattern="[0-9]{6}" autoComplete="one-time-code" required maxLength={6} value={code} onChange={e => setCode(e.target.value)} />
            </label>}
            <button className={button} disabled={busy}>{stage === "email" ? label("发送验证码", "Send code") : label("验证并登录", "Verify and sign in")}</button>
            {stage === "code" && <button type="button" className="ml-4 underline" disabled={busy} onClick={() => { setStage("email"); setCode(""); setNotice(""); setError("") }}>{label("返回邮箱步骤", "Back to email")}</button>}
          </form>
        )}
        {stage === "journal" && <>
          <button className="underline" disabled={busy} onClick={() => void run(async () => {
            await request("POST", { action: "logout" })
            setEntries([]); setDraft(empty); setEditing(null); setDeleting(null); setEmail(""); setStage("email")
          })}>{label("退出登录", "Sign out")}</button>
          <form onSubmit={save} className="space-y-4">
            <fieldset disabled={busy} className="space-y-4">
              <legend className="font-semibold">{editing ? label("编辑日记", "Edit entry") : label("写一条日记", "New entry")}</legend>
              <label className="block">{label("此刻的心情", "How do you feel?")}
                <select required className={field} value={draft.mood} onChange={e => setDraft({ ...draft, mood: e.target.value })}>
                  <option value="">{label("选择心情", "Choose a mood")}</option>
                  {moods.map(([id, cn, en]) => <option key={id} value={id}>{label(cn, en)}</option>)}
                </select>
              </label>
              <label className="block">{label("发生了什么？（选填）", "What happened? (optional)")}
                <textarea className={field} rows={4} maxLength={4000} value={draft.note} onChange={e => setDraft({ ...draft, note: e.target.value })} />
              </label>
              <label className="block">{label("我想为自己做的一件小事（选填）", "One small thing I can do for myself (optional)")}
                <textarea className={field} rows={2} maxLength={500} value={draft.next_step} onChange={e => setDraft({ ...draft, next_step: e.target.value })} />
              </label>
              <button className={button}>{label("保存", "Save")}</button>
              {editing && <button type="button" className="ml-4 underline" onClick={() => { setEditing(null); setDraft(empty) }}>{label("取消编辑", "Cancel edit")}</button>}
            </fieldset>
          </form>
          <h2 className="text-xl font-bold">{label("我的日记", "My entries")}</h2>
          {entries.length === 0 && <p>{label("还没有记录。", "No entries yet.")}</p>}
          <ul className="space-y-3">
            {entries.map(entry => {
              const mood = moods.find(([id]) => id === entry.mood)
              return <li key={entry.id} className="space-y-2 rounded-xl border border-[#719486] p-4">
                <p className="font-semibold">{mood && label(mood[1], mood[2])} · {new Date(entry.created_at).toLocaleDateString(zh ? "zh" : "en")}</p>
                {entry.note && <p className="whitespace-pre-wrap break-words">{entry.note}</p>}
                {entry.next_step && <p className="whitespace-pre-wrap break-words text-[#d6e8df]">{entry.next_step}</p>}
                {deleting === entry.id ? <>
                  <p>{label("确定删除这条日记？", "Delete this entry?")}</p>
                  <button disabled={busy} className="mr-4 underline" onClick={() => void run(async () => {
                    await request("DELETE", undefined, "?id=" + entry.id)
                    setEntries(previous => previous.filter(item => item.id !== entry.id))
                    if (editing === entry.id) { setEditing(null); setDraft(empty) }
                    setDeleting(null)
                    setNotice(label("已删除", "Deleted"))
                  })}>{label("确认删除", "Confirm delete")}</button>
                  <button disabled={busy} className="underline" onClick={() => setDeleting(null)}>{label("取消", "Cancel")}</button>
                </> : <>
                  <button disabled={busy || Boolean(draft.mood || draft.note || draft.next_step)} className="mr-4 underline disabled:opacity-50" onClick={() => { setEditing(entry.id); setDraft(entry) }}>{label("编辑", "Edit")}</button>
                  <button disabled={busy} className="underline" onClick={() => setDeleting(entry.id)}>{label("删除", "Delete")}</button>
                </>}
              </li>
            })}
          </ul>
          {more && <button className={button} disabled={busy} onClick={() => void run(() => load(entries.length))}>{label("查看更多", "Load more")}</button>}
        </>}
      </section>
    </main>
  )
}
