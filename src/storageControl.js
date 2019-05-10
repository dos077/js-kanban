import eventController from "./eventControl";

const storageControl = () => {

  let storage = {};

  const write = () => {
    localStorage.projectId = storage.id;
    localStorage.project = JSON.stringify(storage);
  }

  const read = () => {
    if(localStorage.project) {
      storage = JSON.parse(localStorage.project);
    }
  }

  const initialLoad = () => {
    read();
    if(!storage.id) {
      storage.id = new Date().getTime();
      storage.title = "New Project";
      storage.boards = {};
    }
    let header =  {};
    header.id = storage.id;
    header.title = storage.title;
    eventController.publish('project loaded', header);
    if(Object.keys(storage.boards).length < 2) {
      let boards = ['firstBoard', 'lastBoard'];
      boards.forEach(function(id){
        let order, title;
        if(id == 'firstBoard') {
          order = 1; title = 'Start';
        } else {
          order = 99; title = 'Done';
        }
        storage.boards[id] = {order: order, title: title, notes: {}};
      });
    }
    let boardIds = Object.keys(storage.boards);
    boardIds.forEach(function(id){
      let bPoint = storage.boards[id];
      let board = {id: id, order: bPoint.order, title: bPoint.title}
      eventController.publish('board loaded', board);
      let noteIds = Object.keys(bPoint.notes);
      noteIds.forEach(function(noteId){
        let note = bPoint.notes[noteId];
        note.id = noteId;
        eventController.publish('note loaded', note);
      });
    });
  }

  const saveProject = (project) => {
    storage.title = project.title;
    write();
  }

  const saveBoard = (board) => {
    let point = storage.boards[board.id];
    if(!point) {
      storage.boards[board.id] = {};
      point = storage.boards[board.id];
      point.notes = {};
    }
    point.title = board.title;
    point.order = board.order;
    write();
  }

  const removeBoard = (board) => {
    delete storage.boards[board.id];
    write();
  }

  const saveNote = (note) => {
    let point = storage.boards[note.board].notes[note.id];
    if(!point) {
      storage.boards[note.board].notes[note.id] = {};
      point = storage.boards[note.board].notes[note.id];
    }
    point.body = note.body;
    point.color = note.color;
    point.due = note.due;
    point.board = note.board;
    point.order = note.order;
    write();
  }

  const removeNote = (note) => {
    delete storage.boards[note.board].notes[note.id];
    write();
  }

  const subscriptions = () => {
    eventController.subscribe('board updated', saveBoard);
    eventController.subscribe('board removed', removeBoard);
    eventController.subscribe('note created', saveNote);
    eventController.subscribe('note updated', saveNote);
    eventController.subscribe('note removed', removeNote);
    eventController.subscribe('project updated', saveProject);
  }

  const set = () => {
    subscriptions();
    initialLoad();
  }

  return { set }
}

const storageController = storageControl();

export default storageController