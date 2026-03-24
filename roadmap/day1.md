# Day 1 — LLM Integration & Backend API

## Overview

Built a backend API that integrates with OpenAI’s LLM, enabling dynamic user queries and AI-generated responses. Established foundational understanding of how LLMs operate within backend systems.

---

## Key Concepts Learned

### 1. LLM (Large Language Model)

* Understood that LLMs generate responses by predicting the next token
* Recognized that LLMs are probabilistic, not deterministic
* Learned that LLMs are hosted in the cloud and accessed via API

---

### 2. API Integration

* Connected backend to OpenAI using official SDK
* Sent structured requests and handled responses
* Built a REST endpoint:

```http id="q1cz6e"
POST /ask
```

---

### 3. Async Programming

* Used `async/await` to handle asynchronous API calls
* Ensured proper flow of request → response
* Avoided blocking execution

---

### 4. Request Handling (Express)

* Used `express.json()` to parse incoming JSON
* Extracted user input from `req.body`
* Implemented error handling with try/catch

---

### 5. Prompt Structure (Messages)

* Used `system` and `user` roles to construct prompts
* Understood how context is passed to the LLM
* Controlled AI behavior using system instructions

---

### 6. Response Handling

* Extracted output from:

```js id="l2h9o4"
response.choices[0].message.content
```

* Understood response structure:

  * `choices`
  * `message`
  * `usage`

---

### 7. Tokens & Cost Awareness

* Learned that all input/output is measured in tokens
* Understood cost implications of token usage
* Analyzed:

  * prompt tokens
  * completion tokens
  * total tokens

---

### 8. Security Best Practices

* Stored API key in `.env`
* Prevented exposure using `.gitignore`
* Learned to rotate keys after accidental exposure

---

## Technical Implementation

### OpenAI Client Setup

```js id="e8c41v"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

---

### API Endpoint Example

```js id="v8b9x2"
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful backend assistant." },
        { role: "user", content: question },
      ],
    });

    res.json({
      answer: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
```

---

## Key Takeaways

* LLMs are accessed via APIs, not run locally
* AI responses are generated token-by-token
* Prompt structure directly affects output behavior
* Backend systems must handle responses, errors, and validation
* Security is critical when working with API keys

---

## Outcome

Built a working backend AI service that:

* Accepts user input
* Sends requests to an LLM
* Returns AI-generated responses

---


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Day 1 — ربط الـ LLM مع Backend API

## Overview

قمت ببناء Backend API يتكامل مع OpenAI LLM، بحيث يستقبل أسئلة من المستخدم ويرجع إجابات ذكية. هذا اليوم ركّز على فهم كيف يتم استخدام الـ LLM داخل أنظمة backend.

---

## المفاهيم الأساسية (Key Concepts)

### 1. LLM (Large Language Model)

* فهمت أن الـ LLM هو نموذج يولّد النص عن طريق توقع الـ next token
* تعلمت أنه probabilistic وليس deterministic
* الـ LLM لا يعمل محلياً بل موجود على cloud ويتم الوصول له عبر API

---

### 2. API Integration

* ربطت الـ backend مع OpenAI باستخدام SDK
* بنيت endpoint:

```http id="rmc0z0"
POST /ask
```

* السيرفر يستقبل السؤال ويرسله للـ LLM ويرجع الجواب

---

### 3. Async Programming

* استخدمت `async/await` للتعامل مع API calls
* فهمت كيف أنتظر الرد بدون ما أوقف البرنامج
* تجنبت مشاكل مثل callback hell

---

### 4. Request Handling باستخدام Express

* استخدمت:

```js id="8r9y6g"
express.json()
```

لفهم البيانات القادمة بصيغة JSON

* استخرجت البيانات من:

```js id="2v4z9o"
req.body
```

* أضفت error handling باستخدام `try/catch`

---

### 5. Prompt Structure (messages)

* استخدمت:

  * `system` لتحديد سلوك الـ AI
  * `user` لإرسال السؤال

* فهمت أن:

> الـ messages تمثل الـ context الكامل الذي يعتمد عليه الـ LLM

---

### 6. التعامل مع Response

* استخرجت الجواب من:

```js id="y7z3hp"
response.choices[0].message.content
```

* فهمت structure الرد:

  * `choices`
  * `message`
  * `usage`

---

### 7. Tokens و Cost

* تعلمت أن كل input و output يتم حسابه كـ tokens

* فهمت أن:

  * prompt tokens = السؤال
  * completion tokens = الجواب
  * total tokens = مجموعهم

* tokens تؤثر مباشرة على التكلفة 💰

---

### 8. Security (الأمان)

* خزّنت API key داخل `.env`
* استخدمت `.gitignore` لمنع رفعه على GitHub
* تعلمت أهمية تغيير المفتاح إذا انكشف

---

## التطبيق العملي (Implementation)

### إعداد OpenAI

```js id="9a3zj1"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

---

### مثال على Endpoint

```js id="7u2kdp"
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful backend assistant." },
        { role: "user", content: question },
      ],
    });

    res.json({
      answer: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
```

---

## أهم الاستنتاجات (Key Takeaways)

* الـ LLM يتم استخدامه عبر API وليس تشغيله محلياً
* الـ AI يولّد النص token-by-token
* شكل الـ prompt يؤثر مباشرة على النتيجة
* لازم backend يتعامل مع الأخطاء والـ response بشكل صحيح
* الأمان مهم جداً عند استخدام API keys

---

## النتيجة (Outcome)

قمت ببناء Backend AI service يقوم بـ:

* استقبال input من المستخدم
* إرسال request إلى LLM
* إرجاع response ذكي

---

## الخطوة التالية

Day 2 — Prompt Engineering والتحكم الكامل في سلوك الـ AI

