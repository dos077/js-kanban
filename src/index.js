import noteController from './noteControl'
import boardController from './boardControl'
import projectController from './projectControl'
import eventController from './eventControl'
import storageController from './storageControl'
import dragController from './dragControl'

window.addEventListener('load', function(){
  noteController.set();
  dragController.set();
  boardController.set();
  projectController.set();
  storageController.set();
});