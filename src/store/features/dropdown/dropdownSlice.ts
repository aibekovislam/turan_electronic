import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DropdownState {
  [dropdownId: string]: string | null;
  pickedOptionSidebar?: any;
}

const initialState: DropdownState = {
  pickedOptionSidebar: null,
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setPickedOption(state, action: PayloadAction<{ dropdownId: string; pickedOption: string | null }>) {
      const { dropdownId, pickedOption } = action.payload;
      state[dropdownId] = pickedOption;
    },
    setPickedOptionSidebar(state, action: PayloadAction<string | null>) {
      state.pickedOptionSidebar = action.payload;
    },
  },
});

export const { setPickedOption, setPickedOptionSidebar } = dropdownSlice.actions;

export const selectPickedOption = (dropdownId: string) => (state: { dropdown: DropdownState }) => state.dropdown[dropdownId];
export const selectPickedOptionSidebar = (state: { dropdown: DropdownState }) => state.dropdown.pickedOption;

export default dropdownSlice.reducer;