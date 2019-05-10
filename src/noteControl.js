import eventController from "./eventControl";

const noteControls = () => {
  let note = {}
  let e;

  const readHtml = (id=note.id) => {
    e = document.getElementById(id);
    let noteBody = e.querySelector('.body')
    let board = e.parentNode.parentNode.id;
    let order = parseInt(e.parentNode.style.order);
    let body = noteBody.querySelector('p').innerHTML;
    let due = e.querySelector('.due').querySelector('input').value;
    let color;
    if(noteBody.classList.contains('yellow')) {
      color = 'yellow';
    } else if(noteBody.classList.contains('green')) {
      color = 'green';
    } else if(noteBody.classList.contains('orange')) {
      color = 'orange';
    } else if(noteBody.classList.contains('blue')) {
      color = 'blue';
    } else {
      color = '';
    }
    return {id: e.id, board: board, order: order, body: body, due: due, color: color }
  }

  const loadNote = (id) => {
    note = readHtml(id);
  }

  const checkOpenNote = () => {
    if(note.id) {
      restoreNote();
      closeEditable(note.id);
    }
  }

  const makeEditable = (id) => {
    eventController.publish('open_menu');
    loadNote(id);
    e.querySelector('.note-menu').classList.add('expanded');
    document.getElementById(note.board).classList.add('focus');
    let body = e.querySelector('.body').querySelector('p');
    body.contentEditable = 'true';
    body.classList.add('edit');
  }

  const closeEditable = () => {
    e.querySelector('.note-menu').classList.remove('expanded');
    document.getElementById(note.board).classList.remove('focus');
    let body = e.querySelector('.body').querySelector('p');
    body.contentEditable = 'false';
    body.classList.remove('edit');
    drawDueLine();
    note = {}; e = null;
  }

  const changeColor = (color) => {
    let body = e.querySelector('.body');
    body.classList.remove('yellow', 'orange', 'green', 'blue');
    if(color) { body.classList.add(color); }
    let colors = e.querySelector('.colors');
    colors.querySelector('.selected').classList.remove('selected');
    let btnClass = ".n";
    if(color == 'yellow') { btnClass = ".y"; }
    if(color == 'green') { btnClass = ".g"; }
    if(color == 'blue') { btnClass = ".b"; }
    if(color == 'orange') { btnClass = ".o"; }
    colors.querySelector(btnClass).classList.add('selected');
  }

  const daysRemain = () => {
    if(note.due && Date(note.due)) {
      let dueDay = new Date(note.due);
      let now = new Date();
      return Math.round( (dueDay - now) / (1000*60*60*24) );
    } else {
      return 11;
    }
  }

  const drawDueLine = () => {
    e.querySelector('.note-menu').querySelector('.due').classList.remove('expired');
    let bar = e.querySelector('.due-bar');
    bar.classList.remove('bar-0', 'bar-1', 'bar-2', 'bar-3', 'bar-4', 'bar-5', 'bar-6', 'bar-7', 'bar-8', 'bar-9', 'bar-10')
    let countDown = daysRemain();
    if(countDown>=10) {
      bar.classList.add('bar-0');
    } else if (countDown>0) {
      let barClass = 'bar-' + (10-countDown);
      bar.classList.add(barClass);
    } else { 
      bar.classList.add('bar-10');
      e.querySelector('.note-menu').querySelector('.due').classList.add('expired');
    }
  }

  const restoreNote = () => {
    e.querySelector('.body').querySelector('p').innerHTML = note.body;
    e.querySelector('.due').querySelector('input').value = note.due;
    changeColor(note.color);
  }

  const detectChange = () => {
    let change = false
    let newNote = readHtml(note.id)
    Object.keys(newNote).forEach(function(key){
      if(change) { return; }
      if(newNote[key] != note[key] ) { change = true; }
    });
    return change;
  }

  const saveNote = () => {
    if(detectChange()) {
      loadNote(note.id);
      eventController.publish('note updated', note);
    }
    closeEditable();
  }

  const deleteNote = () => {
    document.getElementById(note.board).classList.remove('focus');
    e.parentNode.removeChild(e);
    eventController.publish('note removed', note);
    note = {};
    e = null;
  }

  const generateHtml = () => {
    let noteHtml = document.getElementById('note-template').innerHTML;
    return noteHtml.replace(/{{color}}/g, note.color)
                    .replace(/{{body}}/g, note.body)
                    .replace(/{{due}}/g, note.due);
  }

  const generateElement = () => {
    e = document.createElement('div');
    e.classList.add('note');
    e.id = note.id;
    e.innerHTML = generateHtml();
  }

  const newNote = () => {
    let id = new Date().getTime();
    let body = '';
    let color = '';
    let due = '';
    let order = 1;
    return {id: id, body: body, color: color, due: due, order: order}
  }

  const addRow = (board, order) => {
    let row = document.createElement('div');
    row.classList.add('row');
    row.style.order = order;
    board.appendChild(row);
    return row;
  }

  const clearRows = () => {
    let rows = document.querySelectorAll('.row');
    rows.forEach(function(row){
      if(row.querySelectorAll('.note').length == 0) {
        row.parentNode.removeChild(row);
      }
    });
  }

  const addNote = ( boardId, source = newNote() ) => {
    note = source;
    generateElement();
    let board = document.getElementById(boardId);
    let rows = board.querySelectorAll('.row');
    let row;
    for(let i=0;i<rows.length;i++) {
      let rowOrder = parseInt(rows[i].style.order);
      if(rowOrder == note.order) { row = rows[i]; }
    }
    if(!row) { row = addRow(board, note.order); }
    row.appendChild(e);
    clearRows();
    drawDueLine();
    setNoteListner(e);
    loadNote(note.id);
    eventController.publish('note created', note);
    note = {};
    e = null;
  }

  const setNoteListner = (note) => {
    let open = note.querySelector('.open');
    open.addEventListener('click',function(){
      makeEditable(note.id);
    });
    let close = note.querySelector('.can');
    close.addEventListener('click', function(){
      restoreNote();
      closeEditable(note.id);
    });
    let save = note.querySelector('.save');
    save.addEventListener('click', function(){
      saveNote();
    });
    let del = note.querySelector('.del');
    del.addEventListener('click', function(){
      deleteNote();
    });
    let colors = note.querySelector('.colors').querySelectorAll('li');
    colors.forEach(function(colorBtn){
      let color; let innerSpan = colorBtn.querySelector('em');
      if(innerSpan) { color = innerSpan.textContent; }
      colorBtn.addEventListener('click', function(){
        changeColor(color);
      });
    });
  }

  const searchNote = (info) => {
    let result = readHtml(info.id);
    if(note.id) { readHtml(); }
    if(result) { eventController.publish('note found', result); }
  }

  const moveNote = (target) => {
    let newNote = readHtml(target.id);
    newNote.order = target.row;
    newNote.board = target.board;
    loadNote(target.id);
    deleteNote();
    addNote(target.board, newNote);
  }

  const subscriptions = () => {
    eventController.subscribe('add_new_note', function(board){
      addNote(board.id);
    });
    eventController.subscribe('open_menu', function(){
      checkOpenNote();
    });
    eventController.subscribe('note loaded', function(source){
      addNote(source.board, source);
    });
    eventController.subscribe('search note', searchNote);
    eventController.subscribe('move note', moveNote);
  }

  
  const set = () => {
    let notes = document.querySelectorAll('.note');
    notes.forEach(function(note){
      setNoteListner(note);
    });
    subscriptions();
  }

  return { set }
}

const noteController = noteControls();

export default noteController;