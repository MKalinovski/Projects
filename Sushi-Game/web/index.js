const createPlayer = function (keys) {
  const onEvent = function (event, payload) {
    if (event === "newPosition") {
      document.getElementById("player" + payload.ID).style.left =
        payload.position.x + "px";
      document.getElementById("player" + payload.ID).style.top =
        payload.position.y + "px";
    }
    if (event === "colorChanged") {
      document.getElementById("firstStick" + payload.ID).style.backgroundColor =
        payload.color;
      document.getElementById(
        "secondStick" + payload.ID
      ).style.backgroundColor = payload.color;
    }
    if (event === "pickSushi") {
      const pickedUpSushi = document.createElement("div");
      const playerPickingUpSushi = document.getElementById(
        "sushiContainer" + payload.ID
      );
      playerPickingUpSushi.append(pickedUpSushi);
      document.getElementById("firstStick" + payload.ID).style.rotate = "-5deg";
      document.getElementById("secondStick" + payload.ID).style.rotate = "5deg";
      switch (payload.type) {
        case 1:
          pickedUpSushi.id = "hosomakiSushi";
          break;
        case 2:
          pickedUpSushi.id = "nigiriSushi";
          break;
        case 3:
          pickedUpSushi.id = "wasabi";
          break;
        case 4:
          pickedUpSushi.id = "soySauce";
          break;
      }
    }
    if (event === "sushiEaten") {
      const playerEatingSushi = document.getElementById(
        "sushiContainer" + payload.ID
      );
      playerEatingSushi.firstChild.remove();
      document.getElementById("p" + payload.ID + "score").innerHTML =
        "Score:" + " " + payload.score;
      document.getElementById("firstStick" + payload.ID).style.rotate = "5deg";
      document.getElementById("secondStick" + payload.ID).style.rotate =
        "-5deg";
    }
  };

  return {
    onEvent,
    keys,
  };
};

const keys = {
  left: 37,
  right: 39,
  up: 38,
  down: 40,
};

const player = createPlayer(keys);
const playerArray = [player];

function movement(e) {
  playerArray.forEach((player, index) => {
    const payload = {
      ID: index,
    };
    switch (e.keyCode) {
      case player.keys.left:
        mediator.send("moveLeft", payload);
        break;
      case player.keys.up:
        mediator.send("moveUp", payload);
        break;
      case player.keys.right:
        mediator.send("moveRight", payload);
        break;
      case player.keys.down:
        mediator.send("moveDown", payload);
        break;
    }
  });
}

function changeColor(id) {
  id = id || 0;
  const payload = {
    ID: id,
    color: document.getElementById("p" + id + "colors").value,
  };
  mediator.send("changeColor", payload);
}

function addPlayer() {
  if (playerArray.length < 2) {
    const keys2 = {
      left: 65,
      right: 68,
      up: 87,
      down: 83,
    };
    const player2 = createPlayer(keys2);
    playerArray.push(player2);

    document.getElementById("newPlayerButton").remove();
    const gameArea = document.getElementById("gameArea");
    const anotherPlayer = document.createElement("div");
    anotherPlayer.setAttribute("id", "player1");
    anotherPlayer.setAttribute("class", "player");
    const secondPlayerFirstStickContainer = document.createElement("div");
    const secondPlayerSecondStickContainer = document.createElement("div");
    const secondPlayerSushiContainer = document.createElement("div");
    const secondPlayerFirstStick = document.createElement("div");
    const secondPlayerSecondStick = document.createElement("div");
    secondPlayerFirstStickContainer.className = "firstStickContainer";
    secondPlayerSecondStickContainer.className = "secondStickContainer";
    secondPlayerSushiContainer.id = "sushiContainer1";
    secondPlayerFirstStick.id = "firstStick1";
    secondPlayerFirstStick.className = "firstStick";
    secondPlayerSecondStick.id = "secondStick1";
    secondPlayerSecondStick.className = "secondStick";
    secondPlayerFirstStickContainer.append(secondPlayerFirstStick);
    secondPlayerSecondStickContainer.append(secondPlayerSecondStick);
    anotherPlayer.append(secondPlayerFirstStickContainer);
    anotherPlayer.append(secondPlayerSushiContainer);
    anotherPlayer.append(secondPlayerSecondStickContainer);
    gameArea.append(anotherPlayer);
    const secondPlayerSettings = document.createElement("div");
    secondPlayerSettings.id = "playerSettings";
    const secondPlayerInfo = document.createElement("div");
    const secondPlayerName = document.createElement("p");
    const secondPlayerScore = document.createElement("p");
    secondPlayerScore.id = "p1score";
    secondPlayerScore.innerHTML = "Score: 0";
    const secondPlayerSelect = document.createElement("select");
    secondPlayerSelect.setAttribute("onchange", "changeColor(1)");
    secondPlayerSelect.name = "p1colors";
    secondPlayerSelect.id = "p1colors";
    const opt1 = document.createElement("option");
    opt1.value = "red";
    const opt2 = document.createElement("option");
    opt2.value = "blue";
    const opt3 = document.createElement("option");
    opt3.value = "green";
    secondPlayerInfo.append(secondPlayerName);
    secondPlayerInfo.append(secondPlayerScore);
    secondPlayerSettings.append(secondPlayerInfo);
    secondPlayerSettings.append(secondPlayerSelect);
    secondPlayerSelect.append(opt1);
    secondPlayerSelect.append(opt2);
    secondPlayerSelect.append(opt3);
    secondPlayerName.innerHTML = "Player 2";
    opt1.innerHTML = "Red";
    opt2.innerHTML = "Blue";
    opt3.innerHTML = "Green";
    document.getElementById("settings").append(secondPlayerSettings);

    const payload = {
      ID: 1,
      color: "blue",
    };

    if (
      document.getElementById("firstStick0").style.backgroundColor != "blue"
    ) {
      mediator.send("changeColor", payload);
      secondPlayerSelect.value = "blue";
    } else {
      payload.color = "red";
      secondPlayerSelect.value = "red";
      mediator.send("changeColor", payload);
    }
  }
}

document.onkeydown = movement;

// mediator.subscribe(player.onEvent);
playerArray.forEach((x) => mediator.subscribe(x.onEvent));
