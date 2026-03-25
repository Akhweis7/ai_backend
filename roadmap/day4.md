# Day 4 — Embeddings, Vector Search, and RAG

## Overview
In this stage, I moved from simple context injection to a real Retrieval-Augmented Generation (RAG) workflow. I generated embeddings for stored documents, saved them in the database as vectors, searched for the most relevant document using similarity search, and used that retrieved context to answer user questions.

---

## Key Concepts

### 1. Embeddings
- Learned that embeddings convert text into numeric vectors
- Used OpenAI embeddings model:
  - `text-embedding-3-small`
- Understood that semantically similar texts produce similar vectors

---

### 2. Vector Storage
- Added a new `embedding` column to the `documents` table
- Enabled the `vector` extension in PostgreSQL / Supabase
- Stored document text together with its embedding

---

### 3. Semantic Search
- Created a SQL function:
  - `match_documents`
- Compared the user question embedding with stored document embeddings
- Retrieved the closest matching document using vector similarity

---

### 4. Similarity Search
- Used pgvector operator:
  - `<=>`
- Ordered documents by vector distance
- Returned the best match for a given query

---

### 5. Real RAG Flow
Built a complete RAG pipeline:

```text
User Question
→ Generate Query Embedding
→ Search Vector Database
→ Retrieve Best Document
→ Inject Context into Prompt
→ Generate Final Answer

//////////////////////////////////////////////////////////////////////

# Day 4 — الـ Embeddings و البحث باستخدام Vector (أساس RAG)

## نظرة عامة
في هذا اليوم قمت ببناء الأساس الحقيقي لنظام RAG، حيث أصبح النظام قادر على تخزين embeddings والبحث عن أقرب document باستخدام التشابه المعنوي.

---

## ماذا أنجزت؟

### 1. توليد Embeddings
- استخدام OpenAI لتحويل النص إلى vector
- تخزين embedding لكل document
- كل document يحتوي الآن على:
  - content
  - embedding

---

### 2. قاعدة بيانات Vector
- تفعيل pgvector في Supabase
- إضافة عمود embedding
- استخدام PostgreSQL كـ vector database

---

### 3. البحث بالتشابه
- إنشاء function اسمها match_documents
- استخدام operator `<=>` لحساب المسافة
- إرجاع أقرب document

---

### 4. Endpoint للبحث
- إنشاء `/search`
- تحويل السؤال إلى embedding
- إرسال embedding إلى DB
- الحصول على أقرب document

---

### 5. بناء RAG كامل
- إنشاء `/ask-rag`
- النظام يعمل كالتالي:
  1. تحويل السؤال إلى embedding
  2. البحث عن أفضل document
  3. إرسال context + السؤال للـ AI
  4. إرجاع الجواب

---

## مفاهيم تعلمتها
- embeddings
- vector search
- semantic search
- RAG architecture
- استخدام DB كمصدر معلومات

---

## النتيجة
النظام أصبح:
- يفهم السؤال
- يبحث عن البيانات المناسبة
- يعطي جواب دقيق مبني على البيانات

---

## الخطوة القادمة
بناء واجهة ويب للتفاعل مع النظام