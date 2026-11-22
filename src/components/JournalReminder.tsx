"use client"

import Link from "next/link"
import { useEffect, useState, type FormEvent } from "react"

type Frequency = "off" | "daily" | "weekdays"
type Settings = { frequency: Frequency; time: string; zone: string; writtenToday: boolean }

export default function JournalReminder({ lang, settings = false }: { lang: string; settings?: boolean }) {
  const zh = lang === "zh"
  const [zone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [preferences, setPreferences] = useState<Settings | null>(null)
  const [frequency, setFrequency] = useState<Frequency>("off")
  const [time, setTime] = useState("20:00")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const url = "/api/journal?reminders=1&zone=" + encodeURIComponent(zone)

  useEffect(() => {
    const controller = new AbortController()
    async function refresh() {
      try {
        const response = await fetch(url, { cache: "no-store", signal: controller.signal })
        if (!response.ok) return
        const data: Settings = await response.json()
        setPreferences(data)
        setFrequency(data.frequency)
        setTime(data.time)
      } catch {}
    }
    function refreshToday() {
      void fetch(url, { cache: "no-store", signal: controller.signal })
        .then(async response => {
          if (!response.ok) return
          const data: Settings = await response.json()
          setPreferences(previous => previous ? { ...previous, writtenToday: data.writtenToday } : data)
        }).catch(() => {})
    }
    void refresh()
    window.addEventListener("deepcalm:journal-changed", refreshToday)
    window.addEventListener("focus", refreshToday)
    return () => {
      controller.abort()
      window.removeEventListener("deepcalm:journal-changed", refreshToday)
      window.removeEventListener("focus", refreshToday)
    }
  }, [url])

  async function save(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setMessage("")
    try {
      const response = await fetch(url, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frequency, time, language: zh ? "zh" : "en" }),
      })
      if (!response.ok) throw Error()
      setPreferences(await response.json())
      setMessage(zh ? "提醒设置已保存。" : "Reminder settings saved.")
    } catch {
      setMessage(zh ? "设置未保存，请重试。" : "Settings could not be saved. Try again.")
    } finally {
      setSaving(false)
    }
  }

  if (!preferences) return null
  const prompt = zh ? "今天想留一句话给自己吗？" : "Would you like to leave yourself a note today?"
  const link = settings ? "#write-entry" : "/" + lang + "/journal#write-entry"
  return (
    <>
      {!preferences.writtenToday && (
        <Link href={link} className="block rounded-xl border border-[#719486] bg-[#203a32] px-4 py-3 text-sm text-[#f4faf6]">
          {prompt} <span className="font-semibold underline">{zh ? "写小日记" : "Write an entry"}</span>
        </Link>
      )}
      {settings && (
        <form id="reminders" onSubmit={save} className="space-y-3 rounded-xl border border-[#719486] p-4">
          <h2 className="font-semibold">{zh ? "邮件提醒" : "Email reminders"}</h2>
          <p className="text-sm text-[#d6e8df]">{zh
            ? "默认关闭。开启后用登录邮箱接收提醒，写过日记的当天会跳过。邮件不包含日记内容。"
            : "Off by default. Reminders go to your sign-in address and skip days you have already written. Your entries stay out of the email."}</p>
          <div className="flex flex-wrap items-end gap-3">
            <label className="grid gap-1 text-sm">
              {zh ? "频率" : "Frequency"}
              <select className="rounded-lg border border-[#719486] bg-[#203a32] p-2" value={frequency} disabled={saving} onChange={e => setFrequency(e.target.value as Frequency)}>
                <option value="off">{zh ? "关闭" : "Off"}</option>
                <option value="daily">{zh ? "每天" : "Daily"}</option>
                <option value="weekdays">{zh ? "工作日" : "Weekdays"}</option>
              </select>
            </label>
            {frequency !== "off" && (
              <label className="grid gap-1 text-sm">
                {zh ? "时间" : "Time"} ({zone})
                <input type="time" className="rounded-lg border border-[#719486] bg-[#203a32] p-2" value={time} required disabled={saving} onChange={e => setTime(e.target.value)} />
              </label>
            )}
            <button className="rounded-lg bg-[#bdebd8] px-3 py-2 text-sm font-semibold text-[#132723] disabled:opacity-50" disabled={saving}>{zh ? "保存提醒设置" : "Save reminder settings"}</button>
          </div>
          {message && <p role="status" className="text-sm">{message}</p>}
        </form>
      )}
    </>
  )
}
