import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'SpiderMan',
        description: "He is SPiderman",
        comics: '2000',
        powers: 'Shoots Webs',
        
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        choosedescription: (state, action) => { state.description = action.payload},
        choosecomics: (state, action) => { state.comics = action.payload},
        choosepowers: (state, action) => { state.powers = action.payload},
        
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, choosedescription, choosepowers, choosecomics } = rootSlice.actions;
