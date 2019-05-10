import eventController from "./eventControl";

const boardControl = () => {
  let board = {}
  let headE;

  const readHtml = (boardId = board.id) => {
    headE = document.getElementById(boardId).querySelector('header');
    let title = headE.querySelector('h2').innerHTML;
    let order = parseInt(headE.parentNode.style.order);
    return {id: boardId, title: title, order: order}
  }

  const loadBoard = (boardId) => {
    board.id = boardId;
    board = readHtml();
  }

  const checkOpen = () => {
    if(board.id) {
      closeMenu();
    }
  }

  const detectChange = () => {
    let change = false
    let newBoard = readHtml(board.id)
    Object.keys(newBoard).forEach(function(key){
      if(change) { return; }
      if(newBoard[key] != board[key] ) { change = true; }
    });
    return change;
  }

  const focusOn = () => {
    headE.parentNode.classList.add('focus');
  }

  const focusOff = () => {
    headE.parentNode.classList.remove('focus');
  }

  const openMenu = (boardId) => {
    eventController.publish('open_menu');
    loadBoard(boardId);
    focusOn();
    headE.querySelector('.menu').classList.add('expanded');
    let title = headE.querySelector('h2');
    title.contentEditable = 'true';
    title.classList.add('edit');
  }

  const closeMenu = () => {
    if(detectChange()) {
      loadBoard(board.id);
      eventController.publish('board updated', board);
    }
    headE.querySelector('.menu').classList.remove('expanded');
    let title = headE.querySelector('h2');
    title.contentEditable = 'false';
    title.classList.remove('edit');
    focusOff();
    board = {}; headE = null;
  }

  const deleteBoard = () => {
    let e = headE.parentNode;
    e.parentNode.removeChild(e);
    eventController.publish('board removed', board);
    board = {}; headE = null;
  }

  const newBoard = () => {
    let id = new Date().getTime();
    let title = 'title';
    let order = document.querySelectorAll('.board').length;
    return {id: id, title: title, order: order}
  }

  const generateHtml = () => {
    let boardHtml = document.getElementById('board-template').innerHTML;
    return boardHtml.replace(/{{title}}/g, board.title);
  }

  const addBoard = ( source=newBoard() ) => {
    board = source;
    let boardNode = document.createElement('section');
    boardNode.id = board.id;
    boardNode.style.order = board.order;
    boardNode.classList.add('board');
    boardNode.innerHTML = generateHtml();
    document.querySelector('.boards-container').appendChild(boardNode);
    setMenu(boardNode);
    eventController.publish('board updated', board);
    board = {};
  }

  const moveUp = () => {
    if(board.order>2) { 
      board.order -= 1;
      headE.parentNode.style.order = board.order;
    }
  }

  const moveDown = () => {
    if(board.order<98) { 
      board.order += 1;
      headE.parentNode.style.order = board.order;
    }
  }

  const clearBoards = () => {
    document.querySelector('.boards-container').innerHTML = '';
  }

  const setMenu = (board) => {
    let header = board.querySelector('header');
    let addBtn = header.querySelector('.btn-add');
    addBtn.addEventListener('click', function(){
      eventController.publish('add_new_note', board);
    });
    let moreBtn = header.querySelector('.btn-more');
    moreBtn.addEventListener('click', function(){
      openMenu(board.id);
    });
    let doneBtn = header.querySelector('.done');
    doneBtn.addEventListener('click', function(){
      closeMenu();
    });
    let deleteBtn = header.querySelector('.del');
    let upBtn = header.querySelector('.up');
    let downBtn = header.querySelector('.down');
    if(board.id == 'firstBoard' || board.id == 'lastBoard') {
      let btns = [deleteBtn, upBtn, downBtn];
      btns.forEach(function(btn){
        btn.classList.add('disabled');
      });
    } else {
      deleteBtn.addEventListener('click', deleteBoard, false );
      upBtn.addEventListener('click', moveUp, false);
      downBtn.addEventListener('click', moveDown, false);
    }
  }

  const subscriptions = () => {
    eventController.subscribe('add_new_board', function(){
      checkOpen();
      addBoard();
    });
    eventController.subscribe('open_menu', function(){
      checkOpen();
    });
    eventController.subscribe('project loaded', clearBoards);
    eventController.subscribe('board loaded', addBoard);
  }

  const set = () => {
    subscriptions();
  }

  return { set }

}

const boardController = boardControl();

export default boardController;