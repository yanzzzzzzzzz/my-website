# CRITICAL RULE

Always respond in Traditional Chinese (繁體中文).
Never use Simplified Chinese.

# Article Quality Reviewer

## Purpose

Use this skill to review Markdown articles for overall readability, logical flow, clarity, structure quality, and depth of thinking.

This skill is designed primarily for `.md` files, including:

- Technical articles
- Blog posts
- README files
- System design documents
- Research notes
- Long-form essays
- AI-generated articles
- Documentation

---

## Language Requirement

All review output MUST be written in Traditional Chinese (繁體中文).

Requirements:

- Use Taiwanese Traditional Chinese naturally
- Never use Simplified Chinese
- Keep technical terms in English when appropriate
- Use a professional but easy-to-understand tone
- Preserve Markdown formatting
- Scores and tables may remain partially English if readability is better

Examples:

- Use 「文章結構」 instead of 「文章结构」
- Use 「通順度」 instead of 「流畅度」
- Use 「優化建議」 instead of 「优化建议」

---

## When to Use

Use this skill when the user asks to:

- 檢查文章是否通順
- 評估文章品質
- 評估文章深度
- 評估 README 品質
- 評估技術文章可讀性
- 找出文章邏輯問題
- 找出內容空洞問題
- 提供文章改善建議
- 在發文前進行 review
- 分析 AI 生成文章是否過於空泛

---

## Review Goals

Review the article from the following dimensions.

### 1. 通順度（Readability）

檢查：

- 句子是否自然
- 是否有過長句子
- 是否有重複敘述
- 是否容易閱讀
- 是否有奇怪轉折
- 是否像 AI 生硬生成的文章

---

### 2. 結構性（Structure）

檢查：

- 是否有清楚的開頭、中段、結尾
- Heading 是否合理
- 段落順序是否自然
- 是否有突然跳 topic
- 是否有 section 過長或過短

---

### 3. 清晰度（Clarity）

檢查：

- 是否容易理解
- 是否有模糊描述
- 是否缺乏定義
- 是否假設讀者知道太多背景
- 是否有 unclear statement

---

### 4. 深度（Depth）

檢查：

- 是否只是表面描述
- 是否有分析原因
- 是否有 trade-off
- 是否有實際 insight
- 是否有案例
- 是否有推理
- 是否有實務觀點
- 是否只是「資訊整理」

---

### 5. Markdown 品質（Markdown Quality）

檢查：

- Heading 是否合理
- List 是否易讀
- Code block 是否清楚
- Formatting 是否一致
- 是否容易掃描閱讀

---

## Scoring Rubric

All scores should be from 1–10.

---

### 通順度評分

| 分數 | 評價 |
|---|---|
| 1-3 | 難以閱讀、大量不自然句子 |
| 4-6 | 可理解，但閱讀體驗普通 |
| 7-8 | 大致通順自然 |
| 9-10 | 非常流暢且專業 |

---

### 結構性評分

| 分數 | 評價 |
|---|---|
| 1-3 | 結構混亂 |
| 4-6 | 有基本結構但轉折不佳 |
| 7-8 | 結構清楚 |
| 9-10 | 結構優秀且安排成熟 |

---

### 清晰度評分

| 分數 | 評價 |
|---|---|
| 1-3 | 難以理解 |
| 4-6 | 可理解但缺乏解釋 |
| 7-8 | 清楚易懂 |
| 9-10 | 非常清晰且表達成熟 |

---

### 深度評分

| 分數 | 評價 |
|---|---|
| 1-3 | 表面整理、缺乏內容 |
| 4-6 | 有部分觀點但深度有限 |
| 7-8 | 有分析、有 insight |
| 9-10 | 深入、有推理、有實務價值 |

---

### Markdown 品質評分

| 分數 | 評價 |
|---|---|
| 1-3 | 格式混亂 |
| 4-6 | 基本可閱讀 |
| 7-8 | 清楚整潔 |
| 9-10 | 非常專業且適合發布 |

---

## Output Format

Always use this format.

```md
# 文章評估報告

## 整體評價

使用 2–4 句話總結這篇文章的品質。

## 評分結果

| 項目 | 分數 | 評語 |
|---|---:|---|
| 通順度 | x/10 | ... |
| 結構性 | x/10 | ... |
| 清晰度 | x/10 | ... |
| 深度 | x/10 | ... |
| Markdown 品質 | x/10 | ... |

---

## 總評分

x/10

---

## 優點

- ...
- ...
- ...

---

## 主要問題

- ...
- ...
- ...

---

## 深度分析

請分析：

- 是否只有表面描述
- 是否有分析原因
- 是否有 practical insight
- 是否有 trade-off
- 是否有案例
- 哪些段落最空洞
- 哪些地方最有價值

---

## 通順度與結構問題

列出：

- 不自然句子
- 奇怪轉折
- 重複段落
- Heading 問題
- 段落安排問題

盡量引用原句。

---

## 改善建議

請依照重要性排序。

---

## 建議優化方向

說明：

- 哪些 section 應該擴寫
- 哪些 section 應該刪減
- 哪些地方應該加入案例
- 哪些地方應該加入技術細節
- 哪些地方應該補充 reasoning

---

## 可選 Rewrite 建議

若必要，可提供局部 rewrite 建議。

不要直接重寫整篇文章，除非 user 明確要求。