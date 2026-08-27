"use client"

import { useEffect, useRef, useState } from "react"
import { BadgeCheck, X, ExternalLink, GraduationCap, Microscope, ShieldCheck } from "lucide-react"
import type { Locale } from "@/types"
import {
  getPrimaryReviewer,
  getReviewerById,
  MEDICALLY_REVIEWED_LABEL,
  VIEW_CREDENTIALS_LABEL,
  LICENSE_LABEL,
  RESEARCH_FOCUS_LABEL,
  CLOSE_LABEL,
  type MedicalReviewerProfile,
} from "@/data/medical-review-board"

interface MedicallyReviewedProps {
  locale: Locale
  /** 指定审核专家 id，缺省使用主审核人 Dr. Evelyn Chen */
  reviewerId?: string
  /** 是否在卡片下方展示资质摘要（用于长文页面） */
  showSummary?: boolean
}

/**
 * MedicallyReviewed — YMYL 级医学审核浮动卡片
 *
 * 卡片态：标题下方精致浮动卡片，展示「Medically Reviewed by」+ 专家姓名 + 头衔。
 * 弹窗态：点击卡片触发高斯模糊弹窗，展示执业资格证编号、专业研究方向、LinkedIn 链接。
 *
 * 无障碍：role="dialog" + aria-modal + ESC 关闭 + 焦点管理。
 */
export default function MedicallyReviewed({
  locale,
  reviewerId,
  showSummary = false,
}: MedicallyReviewedProps) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const reviewer: MedicalReviewerProfile = reviewerId
    ? getReviewerById(reviewerId) || getPrimaryReviewer()
    : getPrimaryReviewer()

  const label = MEDICALLY_REVIEWED_LABEL[locale] || MEDICALLY_REVIEWED_LABEL.en
  const viewLabel = VIEW_CREDENTIALS_LABEL[locale] || VIEW_CREDENTIALS_LABEL.en
  const licenseLabel = LICENSE_LABEL[locale] || LICENSE_LABEL.en
  const researchLabel = RESEARCH_FOCUS_LABEL[locale] || RESEARCH_FOCUS_LABEL.en
  const closeLabel = CLOSE_LABEL[locale] || CLOSE_LABEL.en

  const title = reviewer.title[locale] || reviewer.title.en
  const researchFocus = reviewer.researchFocus[locale] || reviewer.researchFocus.en
  const bio = reviewer.bio[locale] || reviewer.bio.en
  const specialties = reviewer.specialties[locale] || reviewer.specialties.en

  // ESC 关闭 + 弹窗打开时锁定背景滚动
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  // 弹窗打开时聚焦弹窗，关闭时归还焦点到触发按钮
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus()
    } else {
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group inline-flex items-center gap-3 w-full sm:w-auto text-left
          px-4 py-3 rounded-xl border border-emerald-500/25 bg-emerald-50/70
          hover:bg-emerald-50 hover:border-emerald-500/40 hover:shadow-md
          transition-all duration-300 cursor-pointer"
      >
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600
          flex items-center justify-center text-white font-semibold text-sm shadow-sm">
          {reviewer.initials}
        </span>
        <span className="flex flex-col min-w-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wide">
            <BadgeCheck className="w-3.5 h-3.5" />
            {label}
          </span>
          <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800 transition-colors">
            {reviewer.name}
          </span>
          <span className="text-xs text-slate-600 leading-snug">{title}</span>
        </span>
        <span className="ml-auto flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium text-emerald-700
          opacity-0 group-hover:opacity-100 transition-opacity">
          {viewLabel}
          <ExternalLink className="w-3 h-3" />
        </span>
      </button>

      {showSummary && (
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          {bio}
        </p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — ${reviewer.name}`}
        >
          {/* 高斯模糊遮罩 */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* 弹窗主体 */}
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-2xl
              border border-slate-200/60 shadow-2xl outline-none
              max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600
                    flex items-center justify-center text-white font-semibold text-lg shadow-md">
                    {reviewer.initials}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{reviewer.name}</h3>
                    <p className="text-sm text-emerald-700 font-medium">{title}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={closeLabel}
                  className="flex-shrink-0 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {/* 执业资格证编号 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/80 border border-emerald-500/15">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">{licenseLabel}</p>
                    <p className="text-sm font-mono text-slate-800 mt-0.5">{reviewer.licenseNumber}</p>
                  </div>
                </div>

                {/* 专业研究方向 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <Microscope className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{researchLabel}</p>
                    <p className="text-sm text-slate-700 mt-0.5 leading-relaxed">{researchFocus}</p>
                  </div>
                </div>

                {/* 资质简介 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <GraduationCap className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{bio}</p>
                </div>

                {/* 专业领域标签 */}
                <div className="flex flex-wrap gap-2">
                  {specialties.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* LinkedIn 链接 */}
                <a
                  href={reviewer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl
                    bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
