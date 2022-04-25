export default class Card {
  destinationName;
  location;
  photo;
  description;
  createdAtTime = moment();
  editedTime;

  constructor(destinationName, location, photo, description) {
    this.destinationName = destinationName;
    this.location = location;
    this.photo = photo;
    this.description = description;
  }

  async creatItem() {
    let photoUrl = await getPicture(this.destinationName, this.location);
    let date = this.createdAtTime.format("MMMM Do YYYY, h:mm:ss a");

    let template = `<div class="card" id = "card">
           <img class="card-img-top" alt="locationPhoto" src="${this.photo == "" ? photoUrl : this.photo}">
           <div class="card-body">
               <h5 class="card-title">${this.destinationName}</h5>
               <h6 class="card-subtitle mb-2 text-muted">${this.location}</h6>
               <p class="card-text">${this.description}</p>
               <div class="options">
                   <button class="btn btn-warning edit" >Edit</button>
                   <button class="btn btn-danger delete">Remove</button>
               </div>
             
           </div>
           <div class="card-footer d-flex flex-column">
           <small class="text-muted">Added: ${date}</small>
           <small  class="text-muted"></small>
         </div>
       </div>`;

    return template;
  }

  itemListener(button, listener) {
    button.forEach((item) => item.addEventListener("click", listener));
  }

  deleteItem(e) {
    e.target.parentElement.parentElement.parentElement.remove();
    cardContainer.childNodes.length == 0 ? (list.innerText = "Enter destination details") : (list.innerText = "My WishList");
    localStorage.setItem("cards", cardContainer.innerHTML);
  }

  editItem(e) {
    this.editedTime = moment().format();

    let cardBody = e.target.parentElement.parentElement;
    let title = cardBody.children[0];
    let location = cardBody.children[1];
    let description = cardBody.children[2];
    let card = cardBody.parentElement;
    let photoUrl = card.children[0];

    let edited = card.children[2].children[1];
    edited.setAttribute("data-lastupdate", this.editedTime);
    edited.classList.add("lastUpdate");
    edited.innerText = "Updated just now";

    const editedTitle = window.prompt("Enter new name");
    const editedLocation = window.prompt("Enter new location");
    const editedPhoto = window.prompt("Enter new photo url");
    const editedDescription = window.prompt("Enter new description");

    title.innerText = editedTitle == "" ? title.innerText : editedTitle;
    description.innerText = editedDescription == "" ? description.innerText : editedDescription;
    location.innerText = editedLocation == "" ? location.innerText : editedLocation;
    editedPhoto == "" || !editedPhoto.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) ? photoUrl : photoUrl.setAttribute("src", editedPhoto);

    setInterval(timeTracker, 30000);
    localStorage.setItem("cards", cardContainer.innerHTML);
  }
}

async function getPicture(destination, location) {
  const apiUrl = `https://api.unsplash.com/photos/random?orientation=landscape&query=${destination}-${location}&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
  const response = await fetch(apiUrl);
  const photo = await response.json();
  const photoUrl = photo.urls.small;

  return photoUrl;
}

function timeTracker() {
  document.querySelectorAll(".lastUpdate").forEach((e) => {
    let timeString = e.dataset.lastupdate.slice(0, 16).replace("T", " ");
    let lastUpdate = moment(timeString, "YYYY-MM-DD HH:mm").fromNow();
    e.innerText = "Last updated " + lastUpdate;
  });
}

window.addEventListener("load", (event) => {
  setInterval(timeTracker, 1000);
  const reload = new Card();
  cardContainer.innerHTML = localStorage.getItem("cards");

  reload.itemListener(document.querySelectorAll(".delete"), reload.deleteItem);
  reload.itemListener(document.querySelectorAll(".edit"), reload.editItem);
});
