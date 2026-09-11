// Замените URL после публикации Cloudflare Worker.
const API_URL = "https://YOUR-WORKER.workers.dev/api/request";

const form = document.getElementById("requestForm");
const filesInput = document.getElementById("files");
const statusBox = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

const MAX_FILES = 5;
const MAX_FILE_SIZE = 25 * 1024 * 1024;

function setStatus(message, type = "") {
  statusBox.textContent = message;
  statusBox.className = `status ${type}`.trim();
}

filesInput.addEventListener("change", () => {
  const files = [...filesInput.files];

  if (files.length > MAX_FILES) {
    filesInput.value = "";
    setStatus(`Можно прикрепить не более ${MAX_FILES} файлов.`, "error");
    return;
  }

  const tooLarge = files.find(file => file.size > MAX_FILE_SIZE);
  if (tooLarge) {
    filesInput.value = "";
    setStatus(`Файл «${tooLarge.name}» больше 25 МБ.`, "error");
    return;
  }

  setStatus(files.length ? `Выбрано файлов: ${files.length}` : "");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  if (API_URL.includes("YOUR-WORKER")) {
    setStatus("Сначала укажите адрес опубликованного Worker в app.js.", "error");
    return;
  }

  const files = [...filesInput.files];

  if (!files.length) {
    setStatus("Приложите хотя бы один чертёж или документ.", "error");
    return;
  }

  if (files.length > MAX_FILES) {
    setStatus(`Можно прикрепить не более ${MAX_FILES} файлов.`, "error");
    return;
  }

  if (files.some(file => file.size > MAX_FILE_SIZE)) {
    setStatus("Один или несколько файлов больше 25 МБ.", "error");
    return;
  }
  const formData = new FormData(form);
  formData.set("destination", "all");
  submitBtn.disabled = true;
  submitBtn.textContent = "Отправляем…";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Не удалось отправить заявку.");
    }

    form.reset();
    setStatus("Заявка и чертежи отправлены. Спасибо!", "success");
  } catch (error) {
    setStatus(error.message || "Ошибка отправки. Попробуйте ещё раз.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить чертёж на расчёт";
  }
});
