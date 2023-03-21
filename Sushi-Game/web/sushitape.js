const createId = (id) => `sushi${id}`;

const sushiDisplay = (function () {
  const onEvent = function (event, payload) {
    if (event === "moveSushi") {
      const sushiView = document.getElementById(createId(payload.id));

      if (!sushiView) {
        console.warn(`There is no sushi of id ${payload.id}`);
        return;
      }
      sushiView.style.left = `${payload.position}px`;
    }

    if (event === "deleteSushi") {
      var sushi = document.getElementById(createId(payload.id));
      sushi.parentElement.removeChild(sushi);
    }

    if (event === "createSushi") {
      let newSushiHTML;
      let newSushiPieceHTML;
      let newSushiPlateHTML;
      newSushiHTML = document.createElement("div");
      newSushiHTML.id = createId(payload.id);
      newSushiHTML.className = "sushi";
      newSushiPieceHTML = document.createElement("div");
      newSushiPlateHTML = document.createElement("div");
      newSushiPlateHTML.id = "plate";
      newSushiHTML.append(newSushiPieceHTML);
      newSushiHTML.append(newSushiPlateHTML);
      document.getElementById("tape1").append(newSushiHTML);
      switch (payload.type) {
        case 1:
          newSushiPieceHTML.id = "hosomakiSushi";
          break;
        case 2:
          newSushiPieceHTML.id = "nigiriSushi";
          break;
        case 3:
          newSushiPieceHTML.id = "wasabi";
          break;
        case 4:
          newSushiPieceHTML.id = "soySauce";
          break;
      }
    }

    if (event === "pickSushi") {
      const sushiOnAPlate = document.getElementById(createId(payload.sushiID));
      sushiOnAPlate.firstChild.remove();
    }
  };

  return {
    onEvent,
  };
})();

mediator.subscribe(sushiDisplay.onEvent);
