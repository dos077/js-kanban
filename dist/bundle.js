/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/boardControl.js":
/*!*****************************!*\
  !*** ./src/boardControl.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventControl */ \"./src/eventControl.js\");\n\n\nconst boardControl = () => {\n  let board = {}\n  let headE;\n\n  const readHtml = (boardId = board.id) => {\n    headE = document.getElementById(boardId).querySelector('header');\n    let title = headE.querySelector('h2').innerHTML;\n    let order = parseInt(headE.parentNode.style.order);\n    return {id: boardId, title: title, order: order}\n  }\n\n  const loadBoard = (boardId) => {\n    board.id = boardId;\n    board = readHtml();\n  }\n\n  const checkOpen = () => {\n    if(board.id) {\n      closeMenu();\n    }\n  }\n\n  const detectChange = () => {\n    let change = false\n    let newBoard = readHtml(board.id)\n    Object.keys(newBoard).forEach(function(key){\n      if(change) { return; }\n      if(newBoard[key] != board[key] ) { change = true; }\n    });\n    return change;\n  }\n\n  const focusOn = () => {\n    headE.parentNode.classList.add('focus');\n  }\n\n  const focusOff = () => {\n    headE.parentNode.classList.remove('focus');\n  }\n\n  const openMenu = (boardId) => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('open_menu');\n    loadBoard(boardId);\n    focusOn();\n    headE.querySelector('.menu').classList.add('expanded');\n    let title = headE.querySelector('h2');\n    title.contentEditable = 'true';\n    title.classList.add('edit');\n  }\n\n  const closeMenu = () => {\n    if(detectChange()) {\n      loadBoard(board.id);\n      _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('board updated', board);\n    }\n    headE.querySelector('.menu').classList.remove('expanded');\n    let title = headE.querySelector('h2');\n    title.contentEditable = 'false';\n    title.classList.remove('edit');\n    focusOff();\n    board = {}; headE = null;\n  }\n\n  const deleteBoard = () => {\n    let e = headE.parentNode;\n    e.parentNode.removeChild(e);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('board removed', board);\n    board = {}; headE = null;\n  }\n\n  const newBoard = () => {\n    let id = new Date().getTime();\n    let title = 'title';\n    let order = document.querySelectorAll('.board').length;\n    return {id: id, title: title, order: order}\n  }\n\n  const generateHtml = () => {\n    let boardHtml = document.getElementById('board-template').innerHTML;\n    return boardHtml.replace(/{{title}}/g, board.title);\n  }\n\n  const addBoard = ( source=newBoard() ) => {\n    board = source;\n    let boardNode = document.createElement('section');\n    boardNode.id = board.id;\n    boardNode.style.order = board.order;\n    boardNode.classList.add('board');\n    boardNode.innerHTML = generateHtml();\n    document.querySelector('.boards-container').appendChild(boardNode);\n    setMenu(boardNode);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('board updated', board);\n    board = {};\n  }\n\n  const moveUp = () => {\n    if(board.order>2) { \n      board.order -= 1;\n      headE.parentNode.style.order = board.order;\n    }\n  }\n\n  const moveDown = () => {\n    if(board.order<98) { \n      board.order += 1;\n      headE.parentNode.style.order = board.order;\n    }\n  }\n\n  const clearBoards = () => {\n    document.querySelector('.boards-container').innerHTML = '';\n  }\n\n  const setMenu = (board) => {\n    let header = board.querySelector('header');\n    let addBtn = header.querySelector('.btn-add');\n    addBtn.addEventListener('click', function(){\n      _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('add_new_note', board);\n    });\n    let moreBtn = header.querySelector('.btn-more');\n    moreBtn.addEventListener('click', function(){\n      openMenu(board.id);\n    });\n    let doneBtn = header.querySelector('.done');\n    doneBtn.addEventListener('click', function(){\n      closeMenu();\n    });\n    let deleteBtn = header.querySelector('.del');\n    let upBtn = header.querySelector('.up');\n    let downBtn = header.querySelector('.down');\n    if(board.id == 'firstBoard' || board.id == 'lastBoard') {\n      let btns = [deleteBtn, upBtn, downBtn];\n      btns.forEach(function(btn){\n        btn.classList.add('disabled');\n      });\n    } else {\n      deleteBtn.addEventListener('click', deleteBoard, false );\n      upBtn.addEventListener('click', moveUp, false);\n      downBtn.addEventListener('click', moveDown, false);\n    }\n  }\n\n  const subscriptions = () => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('add_new_board', function(){\n      checkOpen();\n      addBoard();\n    });\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('open_menu', function(){\n      checkOpen();\n    });\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('project loaded', clearBoards);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('board loaded', addBoard);\n  }\n\n  const set = () => {\n    subscriptions();\n  }\n\n  return { set }\n\n}\n\nconst boardController = boardControl();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (boardController);\n\n//# sourceURL=webpack:///./src/boardControl.js?");

/***/ }),

/***/ "./src/dragControl.js":
/*!****************************!*\
  !*** ./src/dragControl.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventControl */ \"./src/eventControl.js\");\n\n\nconst dragController = (() => {\n  let note = {}\n  let target = {};\n\n  const addTargets = () => {\n    let boards = document.querySelectorAll('.board');\n    boards.forEach(function(board){\n      let emptyRow = document.createElement('div');\n      emptyRow.classList.add('row', 'empty-row');\n      let rows = board.querySelectorAll('.row')\n      let order = 1;\n      if(rows.length>0) {\n        rows.forEach(function(row){\n          let rowOrder = parseInt(row.style.order);\n          if(rowOrder >= order) { order = rowOrder + 1; }\n        });\n      }\n      emptyRow.style.order = order;\n      board.appendChild(emptyRow);\n    });\n    let rows = document.querySelectorAll('.row');\n    rows.forEach(function(row){\n      let rowOrder = parseInt(row.style.order);\n      let boardId = row.parentNode.id;\n      if(note.order != rowOrder || note.board != boardId) {\n        let target = document.createElement('div');\n        target.classList.add('drop-target');\n        row.appendChild(target);\n        target.addEventListener('dragleave', dragLeave, false);\n        target.addEventListener('dragenter', dragEnter, false);\n      }\n    });\n  }\n\n  const clearTargets = () => {\n    let rows = document.querySelectorAll('.empty-row');\n    rows.forEach(function(row){\n      row.parentNode.removeChild(row);\n    });\n    let targets = document.querySelectorAll('.drop-target');\n    targets.forEach(function(target){\n      target.parentNode.removeChild(target);\n    });\n  }\n\n  const noteSearch = (body) => {\n    let id = body.parentNode.id;\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('search note', {id: id});\n  }\n\n  const loadNote = (source) => { note = source; }\n\n  const dragStart = (event) => {\n    event.dataTransfer.setData('text/plain',null)\n    noteSearch(event.target);\n    event.target.style.opacity = .7;\n    addTargets();\n  }\n\n  const dragEnd = (event) => {\n    event.target.style.opacity = '';\n    clearTargets();\n    if(target.board) {\n      _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('move note', {id: note.id, board: target.board, row: target.row});\n    }\n    target = {}; note = {};\n  }\n\n  const dropNote = (event) => {\n    event.preventDefault();\n    let landing = event.target;\n    if(landing.classList[0] == 'drop-target') {\n      target.board = landing.parentNode.parentNode.id;\n      target.row = parseInt(landing.parentNode.style.order);\n    }\n  }\n\n  const dragEnter = (event) => {\n    let landing = event.target;\n    landing.classList.add('selected');\n  }\n\n  const dragLeave = (event) => {\n    event.target.classList.remove('selected');\n  }\n\n  const subscription = () => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('note found', loadNote);\n  }\n  \n  const set = () => {\n    document.addEventListener(\"dragover\", function(event) {\n      event.preventDefault();\n    });\n    document.addEventListener(\"dragstart\", dragStart, false);\n    document.addEventListener('dragend', dragEnd, false);\n    document.addEventListener('drop', dropNote, false);\n    subscription();\n  }\n\n  return { set }\n\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dragController);\n\n\n//# sourceURL=webpack:///./src/dragControl.js?");

/***/ }),

/***/ "./src/eventControl.js":
/*!*****************************!*\
  !*** ./src/eventControl.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst eventControls = () => {\n  let events = {};\n  let hOP = events.hasOwnProperty;\n  const subscribe = (event, listener) => {\n    if(!hOP.call(events, event)) { events[event] = []; }\n    let index = events[event].push(listener) - 1;\n\n    const remove = () => {\n      delete events[event][index];\n    }\n\n    return remove;\n  }\n  const publish = (event, info) => {\n    if(!hOP.call(events, event)) { return; }\n    events[event].forEach(function(listener) {\n      listener(info != undefined ? info : {});\n    });\n  }\n\n  return { subscribe, publish }\n}\n\nlet eventController = eventControls();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (eventController);\n\n//# sourceURL=webpack:///./src/eventControl.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _noteControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noteControl */ \"./src/noteControl.js\");\n/* harmony import */ var _boardControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boardControl */ \"./src/boardControl.js\");\n/* harmony import */ var _projectControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectControl */ \"./src/projectControl.js\");\n/* harmony import */ var _eventControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventControl */ \"./src/eventControl.js\");\n/* harmony import */ var _storageControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storageControl */ \"./src/storageControl.js\");\n/* harmony import */ var _dragControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dragControl */ \"./src/dragControl.js\");\n\n\n\n\n\n\n\nwindow.addEventListener('load', function(){\n  _noteControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set();\n  _dragControl__WEBPACK_IMPORTED_MODULE_5__[\"default\"].set();\n  _boardControl__WEBPACK_IMPORTED_MODULE_1__[\"default\"].set();\n  _projectControl__WEBPACK_IMPORTED_MODULE_2__[\"default\"].set();\n  _storageControl__WEBPACK_IMPORTED_MODULE_4__[\"default\"].set();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/noteControl.js":
/*!****************************!*\
  !*** ./src/noteControl.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventControl */ \"./src/eventControl.js\");\n\n\nconst noteControls = () => {\n  let note = {}\n  let e;\n\n  const readHtml = (id=note.id) => {\n    e = document.getElementById(id);\n    let noteBody = e.querySelector('.body')\n    let board = e.parentNode.parentNode.id;\n    let order = parseInt(e.parentNode.style.order);\n    let body = noteBody.querySelector('p').innerHTML;\n    let due = e.querySelector('.due').querySelector('input').value;\n    let color;\n    if(noteBody.classList.contains('yellow')) {\n      color = 'yellow';\n    } else if(noteBody.classList.contains('green')) {\n      color = 'green';\n    } else if(noteBody.classList.contains('orange')) {\n      color = 'orange';\n    } else if(noteBody.classList.contains('blue')) {\n      color = 'blue';\n    } else {\n      color = '';\n    }\n    return {id: e.id, board: board, order: order, body: body, due: due, color: color }\n  }\n\n  const loadNote = (id) => {\n    note = readHtml(id);\n  }\n\n  const checkOpenNote = () => {\n    if(note.id) {\n      restoreNote();\n      closeEditable(note.id);\n    }\n  }\n\n  const makeEditable = (id) => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('open_menu');\n    loadNote(id);\n    e.querySelector('.note-menu').classList.add('expanded');\n    document.getElementById(note.board).classList.add('focus');\n    let body = e.querySelector('.body').querySelector('p');\n    body.contentEditable = 'true';\n    body.classList.add('edit');\n  }\n\n  const closeEditable = () => {\n    e.querySelector('.note-menu').classList.remove('expanded');\n    document.getElementById(note.board).classList.remove('focus');\n    let body = e.querySelector('.body').querySelector('p');\n    body.contentEditable = 'false';\n    body.classList.remove('edit');\n    drawDueLine();\n    note = {}; e = null;\n  }\n\n  const changeColor = (color) => {\n    let body = e.querySelector('.body');\n    body.classList.remove('yellow', 'orange', 'green', 'blue');\n    if(color) { body.classList.add(color); }\n    let colors = e.querySelector('.colors');\n    colors.querySelector('.selected').classList.remove('selected');\n    let btnClass = \".n\";\n    if(color == 'yellow') { btnClass = \".y\"; }\n    if(color == 'green') { btnClass = \".g\"; }\n    if(color == 'blue') { btnClass = \".b\"; }\n    if(color == 'orange') { btnClass = \".o\"; }\n    colors.querySelector(btnClass).classList.add('selected');\n  }\n\n  const daysRemain = () => {\n    if(note.due && Date(note.due)) {\n      let dueDay = new Date(note.due);\n      let now = new Date();\n      return Math.round( (dueDay - now) / (1000*60*60*24) );\n    } else {\n      return 11;\n    }\n  }\n\n  const drawDueLine = () => {\n    e.querySelector('.note-menu').querySelector('.due').classList.remove('expired');\n    let bar = e.querySelector('.due-bar');\n    bar.classList.remove('bar-0', 'bar-1', 'bar-2', 'bar-3', 'bar-4', 'bar-5', 'bar-6', 'bar-7', 'bar-8', 'bar-9', 'bar-10')\n    let countDown = daysRemain();\n    if(countDown>=10) {\n      bar.classList.add('bar-0');\n    } else if (countDown>0) {\n      let barClass = 'bar-' + (10-countDown);\n      bar.classList.add(barClass);\n    } else { \n      bar.classList.add('bar-10');\n      e.querySelector('.note-menu').querySelector('.due').classList.add('expired');\n    }\n  }\n\n  const restoreNote = () => {\n    e.querySelector('.body').querySelector('p').innerHTML = note.body;\n    e.querySelector('.due').querySelector('input').value = note.due;\n    changeColor(note.color);\n  }\n\n  const detectChange = () => {\n    let change = false\n    let newNote = readHtml(note.id)\n    Object.keys(newNote).forEach(function(key){\n      if(change) { return; }\n      if(newNote[key] != note[key] ) { change = true; }\n    });\n    return change;\n  }\n\n  const saveNote = () => {\n    if(detectChange()) {\n      loadNote(note.id);\n      _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('note updated', note);\n    }\n    closeEditable();\n  }\n\n  const deleteNote = () => {\n    document.getElementById(note.board).classList.remove('focus');\n    e.parentNode.removeChild(e);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('note removed', note);\n    note = {};\n    e = null;\n  }\n\n  const generateHtml = () => {\n    let noteHtml = document.getElementById('note-template').innerHTML;\n    return noteHtml.replace(/{{color}}/g, note.color)\n                    .replace(/{{body}}/g, note.body)\n                    .replace(/{{due}}/g, note.due);\n  }\n\n  const generateElement = () => {\n    e = document.createElement('div');\n    e.classList.add('note');\n    e.id = note.id;\n    e.innerHTML = generateHtml();\n  }\n\n  const newNote = () => {\n    let id = new Date().getTime();\n    let body = '';\n    let color = '';\n    let due = '';\n    let order = 1;\n    return {id: id, body: body, color: color, due: due, order: order}\n  }\n\n  const addRow = (board, order) => {\n    let row = document.createElement('div');\n    row.classList.add('row');\n    row.style.order = order;\n    board.appendChild(row);\n    return row;\n  }\n\n  const clearRows = () => {\n    let rows = document.querySelectorAll('.row');\n    rows.forEach(function(row){\n      if(row.querySelectorAll('.note').length == 0) {\n        row.parentNode.removeChild(row);\n      }\n    });\n  }\n\n  const addNote = ( boardId, source = newNote() ) => {\n    note = source;\n    generateElement();\n    let board = document.getElementById(boardId);\n    let rows = board.querySelectorAll('.row');\n    let row;\n    for(let i=0;i<rows.length;i++) {\n      let rowOrder = parseInt(rows[i].style.order);\n      if(rowOrder == note.order) { row = rows[i]; }\n    }\n    if(!row) { row = addRow(board, note.order); }\n    row.appendChild(e);\n    clearRows();\n    drawDueLine();\n    setNoteListner(e);\n    loadNote(note.id);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('note created', note);\n    note = {};\n    e = null;\n  }\n\n  const setNoteListner = (note) => {\n    let open = note.querySelector('.open');\n    open.addEventListener('click',function(){\n      makeEditable(note.id);\n    });\n    let close = note.querySelector('.can');\n    close.addEventListener('click', function(){\n      restoreNote();\n      closeEditable(note.id);\n    });\n    let save = note.querySelector('.save');\n    save.addEventListener('click', function(){\n      saveNote();\n    });\n    let del = note.querySelector('.del');\n    del.addEventListener('click', function(){\n      deleteNote();\n    });\n    let colors = note.querySelector('.colors').querySelectorAll('li');\n    colors.forEach(function(colorBtn){\n      let color; let innerSpan = colorBtn.querySelector('em');\n      if(innerSpan) { color = innerSpan.textContent; }\n      colorBtn.addEventListener('click', function(){\n        changeColor(color);\n      });\n    });\n  }\n\n  const searchNote = (info) => {\n    let result = readHtml(info.id);\n    if(note.id) { readHtml(); }\n    if(result) { _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('note found', result); }\n  }\n\n  const moveNote = (target) => {\n    let newNote = readHtml(target.id);\n    newNote.order = target.row;\n    newNote.board = target.board;\n    loadNote(target.id);\n    deleteNote();\n    addNote(target.board, newNote);\n  }\n\n  const subscriptions = () => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('add_new_note', function(board){\n      addNote(board.id);\n    });\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('open_menu', function(){\n      checkOpenNote();\n    });\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('note loaded', function(source){\n      addNote(source.board, source);\n    });\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('search note', searchNote);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('move note', moveNote);\n  }\n\n  \n  const set = () => {\n    let notes = document.querySelectorAll('.note');\n    notes.forEach(function(note){\n      setNoteListner(note);\n    });\n    subscriptions();\n  }\n\n  return { set }\n}\n\nconst noteController = noteControls();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (noteController);\n\n//# sourceURL=webpack:///./src/noteControl.js?");

/***/ }),

/***/ "./src/projectControl.js":
/*!*******************************!*\
  !*** ./src/projectControl.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventControl */ \"./src/eventControl.js\");\n\n\nconst projectControl = () => {\n  let header = {}\n  let e;\n\n  const readHtml = () => {\n    e = document.querySelector('header.main');\n    return {id: e.id, title: e.querySelector('h1').textContent}\n  }\n\n  const writeHtml = () => {\n    e.id = header.id;\n    e.querySelector('h1').textContent = header.title;\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('project updated', header);\n    setClicks();\n  }\n\n  const loadHeader = () => {\n    header = readHtml();\n  }\n\n  const detectChange = () => {\n    let change = false\n    let newHead = readHtml()\n    Object.keys(newHead).forEach(function(key){\n      if(change) { return; }\n      if(newHead[key] != header[key] ) { change = true; }\n    });\n    return change;\n  }\n\n  const openMenu = () => {\n    if(!header.id) {\n      loadHeader();\n    }\n    e.querySelector('.main-menu').classList.add('expanded')\n    e.querySelector('h1').contentEditable = 'true';\n    e.querySelector('h1').classList.add('edit');\n  }\n\n  const closeMenu = () => {\n    if(detectChange()) {\n      loadHeader();\n      _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('project updated', header);\n    }\n    e.querySelector('.main-menu').classList.remove('expanded')\n    e.querySelector('h1').contentEditable = 'false';\n    e.querySelector('h1').classList.remove('edit');\n    header = {};\n  }\n\n  const checkOpen = () => {\n    if(header.id) { closeMenu(); }\n  }\n\n  const addBoard = () => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('add_new_board');\n  }\n\n  const restoreHeader = (source) => {\n    readHtml();\n    header = source;\n    writeHtml();\n  }\n\n  const subscription = () => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('project loaded', restoreHeader);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('open_menu', function(){\n      checkOpen();\n    });\n  }\n\n  const setClicks = () => {\n    readHtml();\n    let title = e.querySelector('h1')\n    title.addEventListener('click', openMenu, false);\n    let canBtn = e.querySelector('.can')\n    canBtn.addEventListener('click', function(){\n      closeMenu();\n    });\n    let addBtn = e.querySelector('.add');\n    addBtn.addEventListener('click', addBoard, false);\n  }\n\n  const set = () => {\n    subscription();\n  }\n\n  return { set }\n}\n\nconst projectController = projectControl();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (projectController);\n\n//# sourceURL=webpack:///./src/projectControl.js?");

/***/ }),

/***/ "./src/storageControl.js":
/*!*******************************!*\
  !*** ./src/storageControl.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventControl */ \"./src/eventControl.js\");\n\n\nconst storageControl = () => {\n\n  let storage = {};\n\n  const write = () => {\n    localStorage.projectId = storage.id;\n    localStorage.project = JSON.stringify(storage);\n  }\n\n  const read = () => {\n    if(localStorage.project) {\n      storage = JSON.parse(localStorage.project);\n    }\n  }\n\n  const initialLoad = () => {\n    read();\n    if(!storage.id) {\n      storage.id = new Date().getTime();\n      storage.title = \"New Project\";\n      storage.boards = {};\n    }\n    let header =  {};\n    header.id = storage.id;\n    header.title = storage.title;\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('project loaded', header);\n    if(Object.keys(storage.boards).length < 2) {\n      let boards = ['firstBoard', 'lastBoard'];\n      boards.forEach(function(id){\n        let order, title;\n        if(id == 'firstBoard') {\n          order = 1; title = 'Start';\n        } else {\n          order = 99; title = 'Done';\n        }\n        storage.boards[id] = {order: order, title: title, notes: {}};\n      });\n    }\n    let boardIds = Object.keys(storage.boards);\n    boardIds.forEach(function(id){\n      let bPoint = storage.boards[id];\n      let board = {id: id, order: bPoint.order, title: bPoint.title}\n      _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('board loaded', board);\n      let noteIds = Object.keys(bPoint.notes);\n      noteIds.forEach(function(noteId){\n        let note = bPoint.notes[noteId];\n        note.id = noteId;\n        _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('note loaded', note);\n      });\n    });\n  }\n\n  const saveProject = (project) => {\n    storage.title = project.title;\n    write();\n  }\n\n  const saveBoard = (board) => {\n    let point = storage.boards[board.id];\n    if(!point) {\n      storage.boards[board.id] = {};\n      point = storage.boards[board.id];\n      point.notes = {};\n    }\n    point.title = board.title;\n    point.order = board.order;\n    write();\n  }\n\n  const removeBoard = (board) => {\n    delete storage.boards[board.id];\n    write();\n  }\n\n  const saveNote = (note) => {\n    let point = storage.boards[note.board].notes[note.id];\n    if(!point) {\n      storage.boards[note.board].notes[note.id] = {};\n      point = storage.boards[note.board].notes[note.id];\n    }\n    point.body = note.body;\n    point.color = note.color;\n    point.due = note.due;\n    point.board = note.board;\n    point.order = note.order;\n    write();\n  }\n\n  const removeNote = (note) => {\n    delete storage.boards[note.board].notes[note.id];\n    write();\n  }\n\n  const subscriptions = () => {\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('board updated', saveBoard);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('board removed', removeBoard);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('note created', saveNote);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('note updated', saveNote);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('note removed', removeNote);\n    _eventControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('project updated', saveProject);\n  }\n\n  const set = () => {\n    subscriptions();\n    initialLoad();\n  }\n\n  return { set }\n}\n\nconst storageController = storageControl();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (storageController);\n\n//# sourceURL=webpack:///./src/storageControl.js?");

/***/ })

/******/ });