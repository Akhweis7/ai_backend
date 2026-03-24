# Day 3 — Database Integration & Context Injection

## Overview

In this stage, I integrated a PostgreSQL database (Supabase) with my backend and connected it to the AI system. This allows storing application data and using it as context for AI responses.

---

## Key Concepts

### 1. Database Integration

* Connected backend to Supabase using `@supabase/supabase-js`
* Stored credentials in `.env`
* Created a table:

```text
documents (id, content, created_at)
```

---

### 2. Row Level Security (RLS)

* Encountered RLS error during insert
* Learned that Supabase requires policies for access
* Added:

  * insert policy
  * select policy

---

### 3. Insert Data (POST /documents)

* Built endpoint to insert documents into database
* Used:

```js
supabase.from("documents").insert(...)
```

---

### 4. Fetch Data (GET /documents)

* Built endpoint to retrieve documents
* Used:

```js
.select("*")
```

---

### 5. Context Injection (POST /ask-with-context)

* Retrieved data from database
* Converted it into context
* Sent it to LLM inside prompt

---

## System Flow

```text
User → Backend → Database → Context → LLM → Answer
```

---

## Key Takeaways

* LLMs don’t have access to private or real-time data
* Database is required to store application data
* Context injection allows AI to use external data
* This is the foundation of a RAG system

---

## Outcome

Built a backend system that:

* Stores data in database
* Retrieves data
* Sends it to AI as context
* Generates grounded responses

---

## Next Step

Day 4 — Embeddings & Similarity Search

/////////////////////////////////////////////////////////////////////////////////////////

# Day 3 — ربط قاعدة البيانات مع الـ AI

## Overview

في هذا اليوم قمت بربط قاعدة بيانات PostgreSQL (Supabase) مع الـ backend، ثم ربطها مع نظام الذكاء الاصطناعي، بحيث يمكن تخزين البيانات واستخدامها كـ context في إجابات الـ AI.

---

## المفاهيم الأساسية

### 1. ربط قاعدة البيانات

* ربطت backend مع Supabase باستخدام `@supabase/supabase-js`
* خزّنت البيانات الحساسة داخل `.env`
* أنشأت جدول:

```text
documents (id, content, created_at)
```

---

### 2. Row Level Security (RLS)

* واجهت خطأ بسبب RLS
* تعلمت أن Supabase يمنع العمليات بدون policies
* أضفت:

  * insert policy
  * select policy

---

### 3. إضافة بيانات (POST /documents)

* أنشأت endpoint لإضافة documents
* استخدمت:

```js
supabase.from("documents").insert(...)
```

---

### 4. قراءة البيانات (GET /documents)

* أنشأت endpoint لقراءة البيانات
* استخدمت:

```js
.select("*")
```

---

### 5. Context Injection

* جلبت البيانات من database
* حولتها إلى context
* أرسلتها إلى AI داخل prompt

---

## كيف يعمل النظام الآن

```text
User → Backend → Database → Context → LLM → Answer
```

---

## أهم الاستنتاجات

* الـ LLM لا يملك بيانات المشروع
* نحتاج database لتخزين البيانات
* يمكن استخدام البيانات كـ context
* هذه بداية بناء نظام RAG

---

## النتيجة

تم بناء نظام قادر على:

* تخزين البيانات
* استرجاعها
* إرسالها إلى AI
* توليد إجابات مبنية على بيانات حقيقية

---

## الخطوة القادمة

Day 4 — Embeddings & RAG الحقيقي
