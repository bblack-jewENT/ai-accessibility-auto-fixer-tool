import { Request, Response } from "express";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import OpenAI from "openai";

type ScanRequest = {
  type: "url" | "code";
  value: string;
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function runAxe(html: string) {
  const dom = new JSDOM(html);
  const { window } = dom;
  // @ts-ignore
  global.window = window;
  // @ts-ignore
  global.Node = window.Node;
  // @ts-ignore
  global.Document = window.Document;
  // @ts-ignore
  global.HTMLElement = window.HTMLElement;
  // @ts-ignore
  global.Element = window.Element;
  // @ts-ignore
  global.getComputedStyle = window.getComputedStyle;
  // @ts-ignore
  global.MutationObserver = window.MutationObserver;
  // @ts-ignore
  global.navigator = window.navigator;
  // @ts-ignore
  global.document = window.document;
  const results = await axe.run(window.document);
  return results;
}

async function getHtmlFromUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch URL");
  return await res.text();
}

async function getAIFixes(violations: any[], html: string) {
  const prompt = `You are an expert WCAG accessibility consultant. Given these axe-core violations: ${JSON.stringify(
    violations,
    null,
    2
  )}, and this original HTML: '''${html}''', suggest precise, minimal fixes to resolve them. Output only valid JSON: { fixedHtml: string, changes: array of { selector: string, issue: string, fix: string } }`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a senior accessibility engineer." },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    max_tokens: 2048,
    temperature: 0.2,
  });
  const content = completion.choices[0]?.message?.content || "{}";
  try {
    return JSON.parse(content);
  } catch {
    return {
      explanation: "AI response could not be parsed.",
      fixedHtml: html,
      changes: [],
    };
  }
}

export default async function scanRoute(req: Request, res: Response) {
  const { type, value } = req.body as ScanRequest;
  let html = "";
  try {
    if (type === "url") {
      html = await getHtmlFromUrl(value);
    } else {
      html = value;
    }
    const axeResults = await runAxe(html);
    const violations = axeResults.violations || [];
    let fixes = null;
    if (violations.length > 0) {
      fixes = await getAIFixes(violations, html);
    }
    res.json({ violations, fixes, originalHtml: html });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Scan failed" });
  }
}
