const details = document.getElementById("details");
const toggleButton = document.querySelector(".header-togle");
const input = document.querySelector(".search-input");
const moon = document.querySelector(".header-icon");
const whiteMoon = document.querySelector(".moon-white");
const searchINput = document.querySelector(".search-white");
const icon = document.querySelector(".search-icon");
const body = document.body;

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
  input.classList.toggle("custom-placeholder");
  moon.classList.toggle("block");
  whiteMoon.classList.toggle("moon-white");
  searchINput.classList.toggle("block");
  icon.classList.toggle("block");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    input.classList.add("custom-placeholder");
    moon.classList.add("block");
    whiteMoon.classList.remove("moon-white");
    searchINput.classList.remove("block");
    icon.classList.add("block");
  }
}

toggleButton.addEventListener("click", toggleDarkMode);

loadTheme();

// counts
async function getData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  return data;
}

const updateUi = (data) => {
  details.innerHTML = "";
  data.forEach((c) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country");

    countryDiv.innerHTML = `
      <div class="countary-wrap">
        <img class="country-img" src="${c.flags.svg}" alt="${c.name.common}" />
        <div class="countary-title-wrap">
          <h5 class="country-title">${c.name.common}</h5>
          <p class="country-Population">
            Population: <span class="country-num">${c.population.toLocaleString()}</span>
          </p>
          <p class="country-Population">
            Region: <span class="country-num">${c.region}</span>
          </p>
          <p class="country-Population">
            Capital: <span class="country-num">${
              c.capital ? c.capital[0] : "N/A"
            }</span>
          </p>
        </div>
      </div>
    `;

    if (document.body.classList.contains("dark")) {
      countryDiv.querySelector(".countary-title-wrap").classList.add("dark");
    }

    details.appendChild(countryDiv);
  });
};

getData()
  .then((data) => updateUi(data))
  .catch((err) => console.log(err));
