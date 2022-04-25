import Card from "./crud.js";

// listening to the form on SubmitEvent
document.querySelector("form").addEventListener("submit", async (e) => {
  list.innerText = "My WishList";
  //Form Inputs
  const name = e.target.elements["name"].value;
  const location = e.target.elements["location"].value;
  const photo = e.target.elements["photo"].value;
  const description = e.target.elements["description"].value;

  //New App object
  const app = new Card(name, location, photo, description);

  //form handlers
  e.preventDefault();
  e.target.reset();
  //   changing the DOM adding a new item that is being created with .creatItem()
  cardContainer.innerHTML += await app.creatItem();

  save(cardContainer.innerHTML);
  //Getting all the buttons from the new item after creation
  const deleteButton = document.querySelectorAll(".delete");
  const editButton = document.querySelectorAll(".edit");
  // adding listers to the buttons that will give them the avility to call delete() and create() method in App
  app.itemListener(deleteButton, app.deleteItem);
  app.itemListener(editButton, app.editItem);
});

function save(items) {
  localStorage.setItem("cards", items);
}
