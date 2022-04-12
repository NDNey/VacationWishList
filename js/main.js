let list = document.querySelector("#list");

//Event listeners after after updating the DOM
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  list.innerText = "My WishList";

  let name = e.target.elements["name"].value;
  let location = e.target.elements["location"].value;
  let photo = e.target.elements["photo"].value;
  let description = e.target.elements["description"].value;

  cardContainer.innerHTML += `<div class="card" id = "card">
     <img class="card-img-top" alt="locationPhoto" src="${photo}">
     <div class="card-body">
         <h5 class="card-title">${name}</h5>
         <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
         <p class="card-text">${description}</p>
         <div class="options">
             <button class="btn btn-warning edit" >Edit</button>
             <button class="btn btn-danger delete">Remove</button>
         </div>
     </div>
 </div>`;

  e.target.reset();
  document.querySelectorAll(".delete").forEach((item) => item.addEventListener("click", deleteItem));
  document.querySelectorAll(".edit").forEach((item) => item.addEventListener("click", editItem));
});

function deleteItem(e) {
  e.target.parentElement.parentElement.parentElement.remove();
}

function editItem(e) {
  let cardBody = e.target.parentElement.parentElement;
  let title = cardBody.children[0];
  let location = cardBody.children[1];
  let description = cardBody.children[2];
  let card = cardBody.parentElement;
  let photoUrl = card.children[0];

  let editedTitle = window.prompt("Enter new name");
  let editedLocation = window.prompt("Enter new location");
  let editedPhoto = window.prompt("Enter new photo url");
  let editedDescription = window.prompt("Enter new description");

  title.innerText = editedTitle;
  description.innerText = editedDescription;
  location.innerText = editedLocation;
  photoUrl.setAttribute("src", editedPhoto);
}
