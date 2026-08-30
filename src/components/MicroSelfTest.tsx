"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/types";
import { getSelfTestData, type SelfTestResult } from "@/lib/self-test-data";

/* ================================================================
 * MicroSelfTest.tsx — 首屏「一键生成专属睡眠报告」微自测工具
 *
 * 3 道单选题，用户选择后即时计算总分并渲染个性化 AI 深度分析
 * 与行为改善建议。SSR 阶段渲染静态题目，客户端水合后交互。
 * ================================================================ */

interface MicroSelfTestProps {
  locale: Locale;
}

const LEVEL_STYLE: Record<SelfTestResult["level"], { badge: string; card: string }> = {
  good: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    card: "border-emerald-200/40 bg-emerald-50/40",
  },
  moderate: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    card: "border-amber-200/40 bg-amber-50/40",
  },
  poor: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    card: "border-rose-200/40 bg-rose-50/40",
  },
};

export default function MicroSelfTest({ locale }: MicroSelfTestProps) {
  const data = useMemo(() => getSelfTestData(locale), [locale]);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const totalScore = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);

  const result: SelfTestResult | null = useMemo(() => {
    if (!submitted || !allAnswered) return null;
    if (totalScore >= 8) return data.results.good;
    if (totalScore >= 5) return data.results.moderate;
    return data.results.poor;
  }, [submitted, allAnswered, totalScore, data]);

  const handleSelect = (qIndex: number, score: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = score;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers([null, null, null]);
    setSubmitted(false);
  };

  const style = result ? LEVEL_STYLE[result.level] : null;

  return (
    <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white/98 backdrop-blur-3xl border border-sky-200/30 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)]">
      <h2 className="text-lg font-bold text-slate-900">{data.heading}</h2>
      <p className="text-sm text-slate-600 mt-1 mb-5">{data.subheading}</p>

      <div className="space-y-4">
        {data.questions.map((q, qi) => (
          <div key={qi}>
            <p className="text-sm font-medium text-slate-800 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mr-2">
                {qi + 1}
              </span>
              {q.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === opt.score;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => handleSelect(qi, opt.score)}
                    className={`text-left px-3 py-2.5 rounded-xl border text-sm transition-all duration-200 ${
                      selected
                        ? "border-sky-400 bg-sky-50 text-sky-800 shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`mt-5 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            allAnswered
              ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-600 hover:to-indigo-600 shadow-lg shadow-sky-500/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {data.submitLabel}
        </button>
      )}

      {result && style && (
        <div className={`mt-5 p-4 rounded-xl border ${style.card}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${style.badge}`}>
              {result.title}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-sky-700 underline underline-offset-2"
            >
              {data.resetLabel}
            </button>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">{result.analysis}</p>
          <ul className="space-y-1.5">
            {result.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
