// placeholder frontend logic
// later will connect to Supabase

function init() {
  const uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.addEventListener("click", handleUpload);

  // placeholder: show fake photos
  renderPhotos([
    { id: 1, url: "https://via.placeholder.com/150", uploader: "Alice" },
    { id: 2, url: "https://via.placeholder.com/150", uploader: "Bob" },
  ]);
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