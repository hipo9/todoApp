import todoStore, { Filters } from '../store/todo.store';
import appHtml from './app.html?raw'
import { renderTodos, renderPending } from './models/use-cases';

const ElementIds = {
    ClearCompletes: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilter: '.filtro',
    PendingCountLabel: '#pending-count'
}
/**
 * 
 * @param {string*} elementId 
 */
export const app = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIds.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount=()=>{
        renderPending(ElementIds.PendingCountLabel);
    }

    /* Funcion anonima autoinvocada */
    /* cuando la funcion app() se llama */
    ( () => {
        const app = document.createElement( 'div' );
        app.innerHTML = appHtml;
        document.querySelector( elementId ).append( app );
        displayTodos();

    } )();

    //se crear a bajo porque priemero se tiene que ejecutar todo el app y cargar las referencia(id, class, etc)

    const newDescriptionInput = document.querySelector( ElementIds.NewTodoInput );
    const todoListUl = document.querySelector( ElementIds.TodoList );
    const btnDeleteCompleted = document.querySelector( ElementIds.ClearCompletes );
    const filtersLIs = document.querySelectorAll( ElementIds.TodoFilter );
    //evento cuando una tecla es presionada y soltada
    newDescriptionInput.addEventListener( 'keyup', ( e ) => {
        const { keyCode, target } = e;
        /* ojo el keycode del evento 13 corresponde a la tecla enter*/
        /* si el "e.keyCode" es diferente a 13(enter) me sacara de la ejecucion solo si es 13 va a continuar y prosesar lo que el usario escribio es una manera de evaluar   */
        if ( keyCode !== 13 ) return;
        //Si el valor ontenido del campo es 0(vacio) que salga de la ejecucion y no ejecute nada
        if ( target.value.trim().lenght === 0 ) return;
        todoStore.addTodo( target.value );

        displayTodos();
        e.target.value = '';
    } );

    todoListUl.addEventListener( 'click', ( e ) => {
        /*El "console.log(e.target)" devuelve como resultado un elemento de tipo label pero como el label esta hasta adentro y no cuenta con un id, tenemos que que conseguir un "id" para eliminar y para eso usamos un metodo .closest que buscara el id que encuentre primero pero sera desde abajo para arriba en conclucion buscara el primer id desde el hijo hacia el padre*/
        const element = e.target.closest( '[data-id]' );
        const todoId = element.getAttribute( 'data-id' );
        todoStore.toggleTodo( todoId );
        displayTodos();

    } );

    //eliminar
    todoListUl.addEventListener( 'click', ( e ) => {
        const btnClassIsDestroy = e.target.className === 'destroy';
        const element = e.target.closest( '[data-id]' );
        const todoId = element.getAttribute( 'data-id' );
        if ( !element || !btnClassIsDestroy ) return
        todoStore.deleteTodo( todoId );
        displayTodos();

    } );

    btnDeleteCompleted.addEventListener( 'click', () => {
        console.log( 'eleminando todo' );
        todoStore.deleteCompleted();
        displayTodos();
    } );

    filtersLIs.forEach( ( element ) => {

        element.addEventListener( 'click', ( element ) => {

            filtersLIs.forEach( el => el.classList.remove( 'selected' ) )
            element.target.classList.add( 'selected' );


            switch ( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                    break;
            }
            displayTodos();
        } );
    } )

}
