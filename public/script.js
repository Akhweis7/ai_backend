const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const answerOutput = document.getElementById("answerOutput");
const contextOutput = document.getElementById("contextOutput");
const documentInput = document.getElementById("documentInput");
const addDocumentButton = document.getElementById("addDocumentButton");
const documentStatus = document.getElementById("documentStatus");
const loadDocumentsButton = document.getElementById("loadDocumentsButton");
const documentsList = document.getElementById("documentsList");

askButton.addEventListener("click", async () => {
  const question = questionInput.value.trim();

  if (!question) {
    answerOutput.textContent = "Please enter a question.";
    contextOutput.textContent = "No context used.";
    return;
  }

  answerOutput.textContent = "Loading answer...";
  contextOutput.textContent = "Searching context...";
  askButton.disabled = true;
  askButton.textContent = "Loading...";

  try {
    const response = await fetch("/ask-rag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (data.error) {
      answerOutput.textContent = data.error;
      contextOutput.textContent = "No context used.";
      return;
    }

    answerOutput.textContent = data.answer || "No answer returned.";
    contextOutput.textContent = data.contextUsed || "No context found.";
    questionInput.value = "";
  } catch (error) {
    answerOutput.textContent = "Something went wrong.";
    contextOutput.textContent = "No context used.";
    console.error(error);
  } finally {
    askButton.disabled = false;
    askButton.textContent = "Ask";
  }
});
addDocumentButton.addEventListener("click", async () => {
    const content = documentInput.value.trim();
  
    if (!content) {
      documentStatus.textContent = "Please enter a document.";
      return;
    }
  
    documentStatus.textContent = "Adding document...";
    addDocumentButton.disabled = true;
    addDocumentButton.textContent = "Adding...";
  
    try {
      const response = await fetch("/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        documentStatus.textContent = data.error;
        return;
      }
  
      documentStatus.textContent = "Document added successfully.";
      documentInput.value = "";
      await loadDocuments();
    } catch (error) {
      documentStatus.textContent = "Something went wrong while adding the document.";
      console.error(error);
    } finally {
      addDocumentButton.disabled = false;
      addDocumentButton.textContent = "Add Document";
    }
  });

  async function loadDocuments() {
    documentsList.textContent = "Loading documents...";
    loadDocumentsButton.disabled = true;
    loadDocumentsButton.textContent = "Loading...";
  
    try {
      const response = await fetch("/documents");
      const data = await response.json();
  
      if (!data.documents || data.documents.length === 0) {
        documentsList.textContent = "No documents found.";
        return;
      }
  
      documentsList.innerHTML = data.documents
        .map((doc) => {
          return `
            <div class="doc-item">
              <strong>Document #${doc.id}</strong>
              <p>${doc.content}</p>
            </div>
          `;
        })
        .join("");
    } catch (error) {
      documentsList.textContent = "Failed to load documents.";
      console.error(error);
    } finally {
      loadDocumentsButton.disabled = false;
      loadDocumentsButton.textContent = "Load Documents";
    }
  }
  
  loadDocumentsButton.addEventListener("click", loadDocuments);
  loadDocuments();