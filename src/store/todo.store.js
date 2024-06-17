import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo( 'Piedra del alma' ),
        new Todo( 'Piedra del infinito' ),
        new Todo( 'Piedra del tiempo' ),
        new Todo( 'Piedra del poder' ),
        new Todo( 'Piedra del realidad' ),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore()
    console.log( 'initStore 🥑' );
}

const loadStore = () => {

    if ( !localStorage.getItem( 'state' ) ) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
    state.todos = todos;
    state.filter = filter;
}
const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify( state ) )
}
/**
 * filter: termino a buscar
 * @param {String} filter 
 * @returns todos
 *
 */
const getTodos = ( filter = Filters.All ) => {
    switch ( filter ) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:

         return   state.todos.filter( todo => todo.done )
        //state.todos.filter(todo=> todo.done===true)
        case Filters.Pending:
         return   state.todos.filter( todo => !todo.done )
        //state.todos.filter(todo=> todo.done===false)

        default:
            throw new Error( `Option ${filter} is not valid XD` );

    }
}
/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error( 'Description es rerquired' );

    state.todos.push( new Todo( description ) );
    saveStateToLocalStorage();

}
/**
 * Actualizacion de las tareas, dependiendo del estado cambiara a false o true
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    //tenemo que regresar un nuevo arreglo
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    } );

    saveStateToLocalStorage();

}
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();

}
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    //state.todos = state.todos.filter( todo => todo.done===true );
    saveStateToLocalStorage();

}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {

    state.filter = newFilter;
    saveStateToLocalStorage();

}
/**
 * sirve para controlar el state    
 */
const getCurrentFilter = () => {
    return state.filter;

}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}

