import eventController from "./eventControl";

const dragController = (() => {
  let note = {}
  let target = {};

  const addTargets = () => {
    let boards = document.querySelectorAll('.board');
    boards.forEach(function(board){
      let emptyRow = document.createElement('div');
      emptyRow.classList.add('row', 'empty-row');
      let rows = board.querySelectorAll('.row')
      let order = 1;
      if(rows.length>0) {
        rows.forEach(function(row){
          let rowOrder = parseInt(row.style.order);
          if(rowOrder >= order) { order = rowOrder + 1; }
        });
      }
      emptyRow.style.order = order;
      board.appendChild(emptyRow);
    });
    let rows = document.querySelectorAll('.row');
    rows.forEach(function(row){
      let rowOrder = parseInt(row.style.order);
      let boardId = row.parentNode.id;
      if(note.order != rowOrder || note.board != boardId) {
        let target = document.createElement('div');
        target.classList.add('drop-target');
        row.appendChild(target);
        target.addEventListener('dragleave', dragLeave, false);
        target.addEventListener('dragenter', dragEnter, false);
      }
    });
  }

  const clearTargets = () => {
    let rows = document.querySelectorAll('.empty-row');
    rows.forEach(function(row){
      row.parentNode.removeChild(row);
    });
    let targets = document.querySelectorAll('.drop-target');
    targets.forEach(function(target){
      target.parentNode.removeChild(target);
    });
  }

  const noteSearch = (body) => {
    let id = body.parentNode.id;
    eventController.publish('search note', {id: id});
  }

  const loadNote = (source) => { note = source; }

  const dragStart = (event) => {
    event.dataTransfer.setData('text/plain',null)
    noteSearch(event.target);
    event.target.style.opacity = .7;
    addTargets();
  }

  const dragEnd = (event) => {
    event.target.style.opacity = '';
    clearTargets();
    if(target.board) {
      eventController.publish('move note', {id: note.id, board: target.board, row: target.row});
    }
    target = {}; note = {};
  }

  const dropNote = (event) => {
    event.preventDefault();
    let landing = event.target;
    if(landing.classList[0] == 'drop-target') {
      target.board = landing.parentNode.parentNode.id;
      target.row = parseInt(landing.parentNode.style.order);
    }
  }

  const dragEnter = (event) => {
    let landing = event.target;
    landing.classList.add('selected');
  }

  const dragLeave = (event) => {
    event.target.classList.remove('selected');
  }

  const subscription = () => {
    eventController.subscribe('note found', loadNote);
  }
  
  const set = () => {
    document.addEventListener("dragover", function(event) {
      event.preventDefault();
    });
    document.addEventListener("dragstart", dragStart, false);
    document.addEventListener('dragend', dragEnd, false);
    document.addEventListener('drop', dropNote, false);
    subscription();
  }

  return { set }

})();

export default dragController
