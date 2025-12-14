document.addEventListener("DOMContentLoaded", () => {
  const localTipsContainer = document.getElementById("localTipsContainer");
  const externalTipsContainer = document.getElementById(
    "externalTipsContainer"
  );

  // === Load local business tips ===
  fetch("business_tips.json")
    .then((res) => res.json())
    .then((tips) => {
      tips.forEach((tip) => {
        const card = document.createElement("div");
        card.className =
          "bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition";
        card.innerHTML = `
          <h3 class="text-xl font-bold text-primary mb-2">${tip.title}</h3>
          <p class="text-gray-700 mb-3">${tip.content}</p>
          <p class="text-sm text-gray-500 italic">– ${tip.author}</p>
        `;
        localTipsContainer.appendChild(card);
      });
    })
    .catch(() => {
      localTipsContainer.innerHTML =
        "<p class='text-center text-gray-600'>Failed to load local tips.</p>";
    });

  // External Global Insights
  const apiKey = "17818c46c7e34aa9bd282bfc43fe0373";
  const query = encodeURIComponent(
    "women empowerment OR gender equality OR female leadership"
  );
  const sources =
    "bbc-news,al-jazeera-english,reuters,cnn,the-guardian-uk, the-washington-post,the-new-york-times, citizentv, ktn-news, the-star-kenya, daily-nation";
  const url = `https://newsapi.org/v2/everything?q=${query}&sources=${sources}&language=en&sortBy=publishedAt&pageSize=6&apiKey=${apiKey}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles && data.articles.length > 0) {
        externalTipsContainer.innerHTML = data.articles
          .map(
            (article) => `
        <div class="bg-pink-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <img src="${article.urlToImage || "images/empower-placeholder.jpg"}" 
               alt="Empowerment news" class="w-full h-48 object-cover rounded-lg mb-3">
          <h3 class="text-xl font-semibold text-primary mb-2">${
            article.title
          }</h3>
          <p class="text-gray-700 mb-3">${article.description || ""}</p>
          <p class="text-sm text-gray-500 mb-2">
            Source: ${article.source.name} — 
            <span class="italic">${new Date(
              article.publishedAt
            ).toLocaleDateString()}</span>
          </p>
          <a href="${article.url}" target="_blank" 
             class="text-pink-700 font-medium hover:underline">Read full story →</a>
        </div>
      `
          )
          .join("");
      } else {
        externalTipsContainer.innerHTML = `<p class='text-center text-gray-600'>No recent women empowerment stories found.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching women empowerment news:", error);
      externalTipsContainer.innerHTML = `<p class='text-center text-red-500'>Failed to fetch global tips.</p>`;
    });
});
