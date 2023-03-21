const calculator = (function () {
  const playersArray = [
    {
      ID: 0,
      position: {
        x: 175,
        y: 50,
      },
      speed: 5,
      color: "red",
      score: 0,
      scoreAdded: 0,
      soySauce: 1,
      isGoingDown: false,
      isGoingBack: false,
      isPickingSushi: false,
    },
    {
      ID: 1,
      position: {
        x: 175,
        y: 50,
      },
      speed: 5,
      color: "blue",
      score: 0,
      scoreAdded: 0,
      soySauce: 1,
      isGoingDown: false,
      isGoingBack: false,
      isPickingSushi: false,
    },
  ];

  const onEvent = function (event, payload) {
    const player = playersArray.find((x) => x.ID === payload.ID);
    if (!player) return;

    switch (event) {
      case "moveLeft":
        if (player.position.x >= 5) {
          if (player.isGoingDown === false) {
            player.position.x -= player.speed;
            mediator.send("newPosition", player);
          }
        }
        break;
      case "moveRight":
        if (player.position.x <= 345) {
          if (player.isGoingDown === false) {
            player.position.x += player.speed;
            mediator.send("newPosition", player);
          }
        }
        break;
      case "moveDown":
        if (player.isGoingDown === false) {
          player.isGoingDown = true;
          let pickingInterval = setInterval(() => {
            const goingDownSpeed = 2 * player.speed;
            if (player.isGoingBack === false) {
              player.position.y += goingDownSpeed;
              mediator.send("newPosition", player);
              if (player.position.y > 630) {
                player.isGoingBack = true;
                mediator.send("checkForSushi", player);
              }
            } else {
              player.position.y -= goingDownSpeed;
              mediator.send("newPosition", player);
              if (player.position.y <= 50) {
                player.isGoingBack = false;
                player.isGoingDown = false;
                clearInterval(pickingInterval);
                if (player.isPickingSushi === true) {
                  player.score += player.scoreAdded * player.soySauce;
                  mediator.send("sushiEaten", player);
                  player.isPickingSushi = false;
                }
              }
            }
          }, 16.66);
          break;
        }
      case "changeColor":
        player.color = payload.color;
        mediator.send("colorChanged", player);
        break;
      case "pickSushi":
        player.isPickingSushi = true;
        player.scoreAdded = payload.score;
        switch (payload.type) {
          case 3:
            player.speed = 7.5;
            setTimeout(() => {
              player.speed = 5;
            }, 10000);
            break;
          case 4:
            player.soySauce = 2;
            setTimeout(() => {
              player.soySauce = 1;
            }, 10000);
            break;
        }
        break;
    }
    playersArray;
  };

  return {
    onEvent,
  };
})();

mediator.subscribe(calculator.onEvent);
