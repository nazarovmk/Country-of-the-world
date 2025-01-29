const details = document.getElementById("details");
const lightBlack = document.querySelector(".header-togle");

// lightBlack.addEventListener("click", () => {
//   document.body.style.backgroundColor = "#202C36";
// });

async function getData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  return data;
}

const updateUi = (data) => {
  details.innerHTML = ""; // Avval eski ma'lumotlarni tozalaymiz
  data.forEach((c) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country");
    countryDiv.innerHTML = `
         <img class="country-img" src="${c.flags.svg}" alt="${c.name.common}" />
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
    `;
    details.appendChild(countryDiv);
  });
};

getData().then((data) => updateUi(data));
