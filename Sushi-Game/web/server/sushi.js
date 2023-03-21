const sushiCalculator = (function () {
  const sushiTape = {
    list: [],
  };
  let msBirthOfNewSushi = 1000;

  // generate new sushi
  const createSushi = () => {
    const type = Math.floor(Math.random() * 10 + 1);
    console.log(type);

    let newSushi;
    // Hosomaki
    if (type >= 1 && type < 7) {
      newSushi = {
        id: sushiTape.list.length + 1,
        type: 1,
        score: 50,
        speed: 1,
        position: -70,
        isAlive: true,
        isPicked: false,
      };
      // Nigiri
    } else if (type >= 7 && type < 9) {
      newSushi = {
        id: sushiTape.list.length + 1,
        type: 2,
        score: 100,
        speed: 1,
        position: -70,
        isAlive: true,
        isPicked: false,
      };
      // Wasabi
    } else if (type == 9) {
      newSushi = {
        id: sushiTape.list.length + 1,
        type: 3,
        score: 0,
        speed: 1,
        position: -70,
        isAlive: true,
        isPicked: false,
      };
      // Soy Sauce
    } else if (type == 10) {
      newSushi = {
        id: sushiTape.list.length + 1,
        type: 4,
        score: 0,
        speed: 1,
        position: -70,
        isAlive: true,
        isPicked: false,
      };
    }

    sushiTape.list.push(newSushi);
    mediator.send("createSushi", newSushi);

    msBirthOfNewSushi = Math.floor(Math.random() * 2500 + 2000);
    console.log(msBirthOfNewSushi);
    console.log(newSushi.type);
    setTimeout(() => {
      createSushi();
    }, msBirthOfNewSushi);
  };

  setTimeout(() => {
    createSushi();
  }, msBirthOfNewSushi);

  // move all sushi
  const ms60fps = 16.66;
  setInterval(() => {
    sushiTape.list.forEach((sushi) => {
      if (sushi.isAlive == true) {
        if (sushi.position < 400) {
          sushi.position += sushi.speed;
          mediator.send("moveSushi", sushi);
        } else {
          mediator.send("deleteSushi", sushi);
          sushi.isAlive = false;
        }
      }
    });
  }, ms60fps);

  const onEvent = function (event, payload) {
    switch (event) {
      case "checkForSushi":
        sushiTape.list.forEach((sushi) => {
          if (sushi.isPicked == false) {
            if (payload.position.x > sushi.position - 5) {
              if (payload.position.x < sushi.position + 25) {
                sushi.isPicked = true;
                const playerVSSushi = {
                  sushiID: sushi.id,
                  score: sushi.score,
                  type: sushi.type,
                  ID: payload.ID,
                };
                console.log(playerVSSushi);
                mediator.send("pickSushi", playerVSSushi);
              }
            }
          }
        });
        break;
    }
  };

  return {
    onEvent,
  };
})();

mediator.subscribe(sushiCalculator.onEvent);
