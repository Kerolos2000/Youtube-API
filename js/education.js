let main = document.querySelector(".allPlatLists .row");
let idChanal = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
let key = "AIzaSyBVApomqeduLVm7DxeWO9_HPNpyb1v7gDw";
let noOfResult = "1000";

function x1() {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${idChanal}&maxResults=${noOfResult}&key=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < response.items.length; i++) {
        let X = "";
        main.innerHTML += `
                      <div class="col-xxl-3 col-xl-4 col-md-4 col-sm-6 allCard">
                        <div class="card">
                        <div class=imgX>
                          <div class=imgXright>
                            <p class="card-title">${response.items[i].contentDetails.itemCount}</p>
                            <i class="material-icons-outlined">playlist_play</i>
                          </div>
                          <a href="http://127.0.0.1:5500/pages/videos.html?list=${response.items[i].id}" class=imgXAll>
                            <i class="material-icons-outlined">play_arrow</i>
                            <p>Play All</p>
                          </a>
                        </div>
                          <div class="card-body">
                            <h5 class="card-title">${response.items[i].snippet.title}</h5>
                            <a href="http://127.0.0.1:5500/pages/videos.html?list=${response.items[i].id}" class="btn">View full playlist</a>
                          </div>
                        </div>
                      </div>
                      `;
      }

      let imgX = document.querySelectorAll(".imgX");
      for (let i = 0; i < imgX.length; i++) {
        imgX[
          i
        ].style.backgroundImage = `url(${response.items[i].snippet.thumbnails.high.url})`;
      }
    });
}
x1();

let channelInfoSpan = "";
function x2() {
  fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${idChanal}&key=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      let x = parseInt(response.items[0].statistics.subscriberCount);
      if (x >= 1000000) {
        x = `${x / 1000000}M subscribers`;
      } else if (x >= 1000) {
        x = `${x / 100}K subscribers`;
      } else {
        x = `${x} subscribers`;
      }
      channelInfoSpan.innerHTML = x;
    });

  channelInfoSpan = document.querySelector(
    ".channelInfo .card .leftCard .text span"
  );
}
x2();

function x3() {
  // channel number of subscription
  fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${idChanal}&key=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      let x = parseInt(response.items[0].statistics.subscriberCount);
      if (x >= 1000000) {
        x = `${x / 1000000}M subscribers`;
      } else if (x >= 1000) {
        x = `${x / 100}K subscribers`;
      } else {
        x = `${x} subscribers`;
      }
      channelInfoSpan.innerHTML = x;
    });
}

// channel Name
let channelInfoImg = document.querySelector(
  ".channelInfo .card .leftCard .img"
);
let channelInfoH3 = document.querySelector(
  ".channelInfo .card .leftCard .text h3"
);
let channelInfoP = document.querySelector(
  ".channelInfo .card .leftCard .text p"
);
function x4() {
  fetch(
    `https://www.googleapis.com/youtube/v3/channels?id=${idChanal}&part=snippet&key=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      channelInfoImg.innerHTML = `<img src="${response.items[0].snippet.thumbnails.default.url}">`;
      channelInfoH3.innerHTML = `${response.items[0].snippet.localized.title}`;
      channelInfoP.innerHTML = `${response.items[0].snippet.customUrl}`;
    });
}
x4();

let channelBanner = document.querySelector(".channelBanner");
function x5() {
  fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${idChanal}&key=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      // console.log(response)
      if (response.items[0].brandingSettings.image) {
        channelBanner.style.display = "block";
        channelBanner.style.backgroundImage = `url(${response.items[0].brandingSettings.image.bannerExternalUrl})`;
      } else {
        channelBanner.style.display = "none";
      }
    });
}
x5();

let mainsearch = document.querySelector("#mainsearch");
let mainBtn = document.querySelector("#mainBtn");
let mainsearchValue;
mainBtn.addEventListener("click", function () {
  mainsearchValue = mainsearch.value;
  if (mainsearchValue.trim() != "") {
    fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${key}&forUsername=${mainsearchValue}&part=id`
    )
      .then((response) => response.json())
      .then((response) => {
        idChanal = response.items[0].id;
        if (response.items.length > 0) {
          main.innerHTML = "";
          x1();
          x2();
          x3();
          x4();
          x5();
        }
      })
      .catch((error) => {
        main.innerHTML = `<h2 class="text-center my-5">There is no channel with <span class="mainsearchValue">${mainsearchValue}</span> username</h2>`;
        channelBanner.style.display = "block";
        channelBanner.style.backgroundImage = `url(../img/confetti-doodles.png)`;
        channelInfoImg.innerHTML = `<img src="../img/confetti-doodles.png">`;
        channelInfoH3.innerHTML = ` <span class="mainsearchValue">${mainsearchValue}</span> not found`;
        channelInfoP.innerHTML = `<span class="mainsearchValue">${mainsearchValue}</span> not found`;
        channelInfoSpan.innerHTML = `number of subscription not found`;
      });
  }
});

mainsearch.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    mainBtn.click();
  }
});
