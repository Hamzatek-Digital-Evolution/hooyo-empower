document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("programsContainer");
  const searchInput = document.getElementById("searchInput");

  // Fetch data from JSON
  fetch("programs.json")
    .then((res) => res.json())
    .then((programs) => {
      displayPrograms(programs);

      // Search filter
      searchInput.addEventListener("keyup", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = programs.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
        displayPrograms(filtered);
      });
    })
    .catch((err) => {
      container.innerHTML = `<p class='text-center text-gray-600'>Failed to load programs. Please try again later.</p>`;
      console.error("Error loading JSON:", err);
    });

  // Render program cards
  function displayPrograms(programs) {
    container.innerHTML = "";
    if (programs.length === 0) {
      container.innerHTML = `<p class='text-center text-gray-600 col-span-3'>No programs found.</p>`;
      return;
    }

    programs.forEach((p) => {
      const card = document.createElement("div");
      card.className =
        "bg-pink-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between";

      card.innerHTML = `
        <div>
          <h3 class="text-xl font-semibold text-primary mb-2">${p.title}</h3>
          <p class="text-sm text-gray-700 mb-3">${p.description}</p>
          <p class="text-sm text-gray-600"><strong>Category:</strong> ${p.category}</p>
          <p class="text-sm text-gray-600"><strong>Location:</strong> ${p.location}</p>
          <p class="text-sm text-gray-600"><strong>Organization:</strong> ${p.organization}</p>
        </div>
        <a href="${p.link}" target="_blank" class="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg text-center hover:bg-pink-700 transition">Learn More</a>
      `;
      container.appendChild(card);
    });
  }
});
