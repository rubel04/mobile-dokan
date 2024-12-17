const loadPhones = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchText ? searchText : "iphone"
    }`
  );
  const data = await res.json();
  // console.log(data);
  displayPhones(data.data, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  console.log(phones);
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";
  const btnShowAll = document.getElementById("btn-showAll");
  if (phones.length > 12 && !isShowAll) {
    btnShowAll.classList.remove("hidden");
  } else {
    btnShowAll.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);

    const { slug, phone_name, image } = phone;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 border border-gray-300 rounded-md">
    <div class="bg-sky-50 flex justify-center m-4 rounded-md">
        <img
        src=${image}
        alt="phone-images"
        class="rounded-xl py-8" />
    </div>
  <div class="card-body items-center text-center">
    <h2 class="card-title font-bold">${phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <h2 class="card-title font-bold mb-2">$999</h2>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-secondary">Show Details</button>
    </div>
  </div>
</div>
    `;
    phoneContainer.appendChild(div);
  });
};

const showAllPhones = () => {
  // displayPhones(true)
  handleSearch(true);
};

const handleSearch = (isShowAll) => {
  const searchText = document.getElementById("search-field").value;
  loadPhones(searchText, isShowAll);
};

const phoneDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data.data);
  const { slug, name, brand, image, mainFeatures, releaseDate, others } =
    data.data;
  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = `
        <dialog id="my_modal_3" class="modal">
                <div class="modal-box">
                  <div class="flex justify-center bg-sky-50 mb-4">
                  <img class="py-8" src=${image} alt="">
                  </div>
                  <h3 class="text-xl font-bold">${name}</h3>
                  <div class="space-y-2 mt-4">
                  <p><span class="font-bold">Storage: </span>${
                    mainFeatures.storage
                  }</p>
                  <p><span class="font-bold">Display Size: </span>${
                    mainFeatures.displaySize
                  }</p>
                  <p><span class="font-bold">Chipset: </span>${
                    mainFeatures.chipSet
                  }</p>
                  <p><span class="font-bold">Memory: </span>${
                    mainFeatures.memory
                  }</p>
                  <p><span class="font-bold">Slug: </span>${slug}</p>
                  <p><span class="font-bold">Release Data: </span>${releaseDate}</p>
                  <p><span class="font-bold">Brand: </span>${brand}</p>
                  <p><span class="font-bold">GPS: </span>${
                    others ? others.GPS : ""
                  }</p>
                  </div>
                  <div class="modal-action">
                    <form method="dialog">
                      <button class="btn bg-red-600 text-white">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
    `;
  my_modal_3.showModal();
};

loadPhones("iphone");
