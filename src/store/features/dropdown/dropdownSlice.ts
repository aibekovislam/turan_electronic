// dropdownSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DropdownState {
  pickedOption: string | null;
}

const initialState: DropdownState = {
  pickedOption: null,
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setPickedOption(state, action: PayloadAction<string | null>) {
      state.pickedOption = action.payload;
    },
  },
});

export const { setPickedOption } = dropdownSlice.actions;

export const selectPickedOption = (state: { dropdown: DropdownState }) => state.dropdown.pickedOption;

export default dropdownSlice.reducer;