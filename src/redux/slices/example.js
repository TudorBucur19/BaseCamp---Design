// import { createSlice } from "@reduxjs/toolkit";

// export const todosSlice = createSlice({
//     name: "todosList",
//     initialState: [],
//     reducers: {
//         addTodo: (state, action) => {
//             return [...state, action.payload];
//         },

//         completeTodo: (state, action) => {
//             return state.map((item, index) => {
//                 if(index !== action.payload.index) {
//                     return item;
//                 }
//                 return {
//                     ...item,
//                     completed: !item.completed,
//                 }
//             })
//         },

//         removeTodo: (state, action) => {
//             return state.filter(item => state.indexOf(item) !== action.payload);
//         }
//     }
// });

// export const { addTodo, completeTodo, removeTodo } = todosSlice.actions;

// export default todosSlice.reducer;