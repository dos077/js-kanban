const eventControls = () => {
  let events = {};
  let hOP = events.hasOwnProperty;
  const subscribe = (event, listener) => {
    if(!hOP.call(events, event)) { events[event] = []; }
    let index = events[event].push(listener) - 1;

    const remove = () => {
      delete events[event][index];
    }

    return remove;
  }
  const publish = (event, info) => {
    if(!hOP.call(events, event)) { return; }
    events[event].forEach(function(listener) {
      listener(info != undefined ? info : {});
    });
  }

  return { subscribe, publish }
}

let eventController = eventControls();

export default eventController;