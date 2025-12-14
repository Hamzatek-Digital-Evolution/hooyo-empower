document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("storiesContainer");

  fetch("stories.json")
    .then((res) => res.json())
    .then((stories) => {
      stories.forEach((story) => {
        const card = document.createElement("div");
        card.className =
          "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col";

        card.innerHTML = `
          <img src="${story.photo}" alt="${
          story.name
        }" class="h-56 w-full object-cover">
          <div class="p-6 flex flex-col justify-between flex-grow">
            <h3 class="text-xl font-semibold text-primary mb-2">${
              story.name
            }</h3>
            <p class="text-gray-700 mb-3">${story.story}</p>
            <p class="italic text-sm text-gray-600 mb-3">"${story.quote}"</p>
            <p class="text-sm text-gray-500 mb-4"><strong>Location:</strong> ${
              story.location
            }</p>
            ${
              story.video
                ? `<div class="mt-4">
                    <iframe class="w-full h-48 rounded-lg" src="${story.video}" frameborder="0" allowfullscreen></iframe>
                  </div>`
                : ""
            }
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      container.innerHTML = `<p class="text-center text-gray-600">Failed to load stories.</p>`;
      console.error("Error loading stories:", err);
    });
});
