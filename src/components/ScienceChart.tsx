"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/types";
import { getScienceChartData, type ScienceChartData } from "@/lib/science-chart-data";

/* ================================================================
 * ScienceChart.tsx — 动态科学图表组件
 *
 * 原生 Canvas 绘制，按 topic 类别注入循证数据（折线 / 柱状对比）。
 * SSR 阶段渲染占位容器，客户端水合后绘制，不影响 SEO 文本结构。
 * ================================================================ */

interface ScienceChartProps {
  category: string;
  locale: Locale;
}

const PALETTE = {
  before: "#94a3b8",
  after: "#0ea5e9",
  grid: "#e2e8f0",
  text: "#475569",
  accent: "#0284c7",
};

function drawChart(canvas: HTMLCanvasElement, data: ScienceChartData) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);

  const pad = { top: 28, right: 20, bottom: 40, left: 44 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const points = data.points;
  const allValues = points.flatMap((p) => [p.before, p.after]);
  const maxVal = Math.max(...allValues) * 1.15;
  const minVal = Math.min(...allValues) * 0.85;
  const range = maxVal - minVal || 1;

  const x = (i: number) => pad.left + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW);
  const y = (v: number) => pad.top + plotH - ((v - minVal) / range) * plotH;

  /* 网格线 + Y 轴刻度 */
  ctx.strokeStyle = PALETTE.grid;
  ctx.lineWidth = 1;
  ctx.fillStyle = PALETTE.text;
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  const gridLines = 4;
  for (let g = 0; g <= gridLines; g++) {
    const gy = pad.top + (plotH / gridLines) * g;
    ctx.beginPath();
    ctx.moveTo(pad.left, gy);
    ctx.lineTo(width - pad.right, gy);
    ctx.stroke();
    const val = maxVal - (range / gridLines) * g;
    ctx.fillText(val.toFixed(1), pad.left - 8, gy);
  }

  /* X 轴标签 */
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  points.forEach((p, i) => {
    ctx.fillText(p.label, x(i), pad.top + plotH + 10);
  });

  /* 图例 */
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = PALETTE.before;
  ctx.fillRect(pad.left, pad.top - 18, 12, 3);
  ctx.fillText(data.beforeLabel, pad.left + 16, pad.top - 16);
  ctx.fillStyle = PALETTE.after;
  ctx.fillRect(pad.left + 110, pad.top - 18, 12, 3);
  ctx.fillText(data.afterLabel, pad.left + 126, pad.top - 16);

  if (data.type === "line") {
    /* 折线图：before / after 两条线 */
    const drawLine = (key: "before" | "after", color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      points.forEach((p, i) => {
        const px = x(i);
        const py = y(p[key]);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      /* 数据点 */
      points.forEach((p, i) => {
        const px = x(i);
        const py = y(p[key]);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };
    drawLine("before", PALETTE.before);
    drawLine("after", PALETTE.after);
  } else {
    /* 柱状图：每组两根柱 */
    const groupW = plotW / points.length;
    const barW = Math.min(22, groupW * 0.28);
    points.forEach((p, i) => {
      const cx = x(i);
      const drawBar = (key: "before" | "after", color: string, offset: number) => {
        const bv = p[key];
        const by = y(bv);
        const bx = cx + offset - barW / 2;
        const grad = ctx.createLinearGradient(0, by, 0, pad.top + plotH);
        grad.addColorStop(0, color);
        grad.addColorStop(1, color + "55");
        ctx.fillStyle = grad;
        ctx.fillRect(bx, by, barW, pad.top + plotH - by);
        ctx.fillStyle = color;
        ctx.font = "bold 11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(String(bv), bx + barW / 2, by - 4);
      };
      drawBar("before", PALETTE.before, -barW / 2 - 2);
      drawBar("after", PALETTE.after, barW / 2 + 2);
    });
  }
}

export default function ScienceChart({ category, locale }: ScienceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = getScienceChartData(category, locale);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawChart(canvas, data);

    const handleResize = () => drawChart(canvas, data);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  return (
    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-50/80 to-indigo-50/60 border border-sky-200/30">
      <div className="mb-3">
        <h4 className="text-sm font-bold text-slate-900">{data.title}</h4>
        <p className="text-xs text-slate-600 mt-0.5">{data.subtitle}</p>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-56 sm:h-64"
        aria-label={data.title}
        role="img"
      />
      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{data.footnote}</p>
    </div>
  );
}
