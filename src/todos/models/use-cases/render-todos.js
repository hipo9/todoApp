//aqui se va a rendirizar los todos 

import { createTodoHtml } from './';
let element;
/**
 * 
 * @param {String} elementId: Es el id de <li> del html en donde se insertara
 * @param {Todo}  
 */
export const renderTodos = ( elementId, todos = [] ) => {
    /* Las condiciones sirven para que el render no se este rendirizado a todo momento cuando sea llamado */
    if ( !element )
        element = document.querySelector( elementId );
    if ( !element ) throw Error( `Element ${elementId} not found` );
    /* una vez que se mande allamar el 'renderTodos' liberamos todo el contenido(los todos)*/

    //element.innerHtml = '';
    while ( element.firstChild ) {//limpiar todo la lista
        element.removeChild( element.firstChild );
    }
    //creamos la lista de tareas dependiendo si el done esta en false o true
    todos.forEach( todo => {
        element.append( createTodoHtml( todo ) );
    } )
}
