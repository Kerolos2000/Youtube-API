let pageIdX = document.location.search;
let pageId = pageIdX.slice(6);
let listGroup = document.querySelector("#listGroup");
let mainAccordion = document.querySelector("#mainAccordion");
let mainMenu = document.querySelector("#mainMenu");

function getData(id, name, url) {
  mainAccordion.innerHTML = `
      <div id="accordion${id}">
        <div class="card">
          <div class="card-header">
            ${name}
          </div>
          <div class="card-body">
          <iframe width="1280" height="720" 
            src="${url}" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
            picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
  </div>
      `;
}

function x1() {
  let key = "AIzaSyBVApomqeduLVm7DxeWO9_HPNpyb1v7gDw";
  let noOfResult = "1000";
  fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=${noOfResult}&playlistId=${pageId}&key=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < response.items.length; i++) {
        listGroup.innerHTML += `
            <li class="activeX list-group-item"
            onclick="getData(this.id, this.dataset.text, this.dataset.url)" 
            data-url="https://www.youtube.com/embed/${
              response.items[i].snippet.resourceId.videoId
            }?list=${response.items[i].snippet.playlistId}" 
            data-text="${response.items[i].snippet.position + 1} - ${
          response.items[i].snippet.title
        }"
            id="${response.items[i].snippet.position + 1}">
            <span>${response.items[i].snippet.position + 1} - ${
          response.items[i].snippet.title
        } </span> 
            <img src="${response.items[i].snippet.thumbnails.default.url}">
            </li>
                `;
        getData(
          0,
          `${response.items[0].snippet.position + 1} - ${
            response.items[0].snippet.title
          }`,
          `https://www.youtube.com/embed/${response.items[0].snippet.resourceId.videoId}?list=${response.items[0].snippet.playlistId}`
        );
      }
      // add class active
      let activeX = document.querySelectorAll(".activeX");
      activeX[0].classList.add("active");
      activeX.forEach((x) => {
        x.addEventListener("click", function () {
          activeX.forEach((btn) => btn.classList.remove("active"));
          this.classList.add("active");
        });
      });
    });
}
x1();

