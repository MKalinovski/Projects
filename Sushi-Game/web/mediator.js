const mediator = (function () {
  const subscribers = [];
  const send = function (event, payload) {
    for (let i = 0; i < subscribers.length; i++) {
      const element = subscribers[i];
      element(event, payload);
    }
  };

  const subscribe = function (onSubscribe) {
    subscribers.push(onSubscribe);
  };

  return {
    send,
    subscribe,
  };
})();

window.mediator = mediator;
