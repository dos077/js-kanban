import eventController from "./eventControl";

const projectControl = () => {
  let header = {}
  let e;

  const readHtml = () => {
    e = document.querySelector('header.main');
    return {id: e.id, title: e.querySelector('h1').textContent}
  }

  const writeHtml = () => {
    e.id = header.id;
    e.querySelector('h1').textContent = header.title;
    eventController.publish('project updated', header);
    setClicks();
  }

  const loadHeader = () => {
    header = readHtml();
  }

  const detectChange = () => {
    let change = false
    let newHead = readHtml()
    Object.keys(newHead).forEach(function(key){
      if(change) { return; }
      if(newHead[key] != header[key] ) { change = true; }
    });
    return change;
  }

  const openMenu = () => {
    if(!header.id) {
      loadHeader();
    }
    e.querySelector('.main-menu').classList.add('expanded')
    e.querySelector('h1').contentEditable = 'true';
    e.querySelector('h1').classList.add('edit');
  }

  const closeMenu = () => {
    if(detectChange()) {
      loadHeader();
      eventController.publish('project updated', header);
    }
    e.querySelector('.main-menu').classList.remove('expanded')
    e.querySelector('h1').contentEditable = 'false';
    e.querySelector('h1').classList.remove('edit');
    header = {};
  }

  const checkOpen = () => {
    if(header.id) { closeMenu(); }
  }

  const addBoard = () => {
    eventController.publish('add_new_board');
  }

  const restoreHeader = (source) => {
    readHtml();
    header = source;
    writeHtml();
  }

  const subscription = () => {
    eventController.subscribe('project loaded', restoreHeader);
    eventController.subscribe('open_menu', function(){
      checkOpen();
    });
  }

  const setClicks = () => {
    readHtml();
    let title = e.querySelector('h1')
    title.addEventListener('click', openMenu, false);
    let canBtn = e.querySelector('.can')
    canBtn.addEventListener('click', function(){
      closeMenu();
    });
    let addBtn = e.querySelector('.add');
    addBtn.addEventListener('click', addBoard, false);
  }

  const set = () => {
    subscription();
  }

  return { set }
}

const projectController = projectControl();

export default projectController;