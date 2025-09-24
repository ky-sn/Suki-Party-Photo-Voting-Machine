const { createClient } = supabase;
const SUPABASE_URL = "https://ewnglogfpfcpimiuhysc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bmdsb2dmcGZjcGltaXVoeXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2Mzc3NzcsImV4cCI6MjA3NDIxMzc3N30.fgjnLIYjVEZG67HL1mB2EHuxSXZW2HwFAhspMY0UKas";

const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function init() {
  const uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.addEventListener("click", handleUpload);

  renderPhotos([
    { id: 1, url: "https://via.placeholder.com/150", uploader: "Alice" },
    { id: 2, url: "https://via.placeholder.com/150", uploader: "Bob" },
  ]);
}

async function loadPhotos() {
  let { data, error } = await db
    .from("photos")
    .select("*")
    .eq("approved", true);
  if (error) {
    console.error(error);
    return;
  }
  renderPhotos(data);
}

function handleUpload() {
  const alias = document.getElementById("alias").value.trim();
  const file = document.getElementById("photo").files[0];
  if (!alias || !file) {
    alert("Alias and photo required.");
    return;
  }
  alert(`Would upload ${file.name} for ${alias}`);
  // TODO: integrate Supabase storage + DB
}

function renderPhotos(photos) {
  const container = document.getElementById("photos");
  container.innerHTML = "";
  photos.forEach(p => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
      <img src="${p.url}" alt="Photo by ${p.uploader}">
      <p>${p.uploader}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", init);