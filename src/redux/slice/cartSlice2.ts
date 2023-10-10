import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItemType } from "../../types";

declare interface CartState {
  items: CartItemType[];
  selectedItems: CartItemType[];
  order: CartItemType[];
}

//items는 장바구니 데이터, selectedItems는 현재 장바구니에서 선택된 데이터, order는 결제페이지에서 확인하는 데이터입니다.
const initialState: CartState = {
  items: [], //장바구니에 보여질화면
  selectedItems: [],
  order: [], //결제화면에 보여줄 아이템들
};

const allAvailableItemsSelected = (state: CartState) => {
  const availableItems = state.items.filter(
    (item) => item.amount <= item.stock_quantity
  );
  return availableItems.every((item) =>
    state.selectedItems.some(
      (selectedItem) => selectedItem.product_id === item.product_id
    )
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItemType[]>) => {
      state.items = action.payload;
    },
    resetOrder: (state) => {
      state.order = [];
    },
    toggleSelectItem: (state, action: PayloadAction<CartItemType>) => {
      const currentItem = action.payload;
      const existingItem = state.selectedItems.find(
        (item) => item.product_id === currentItem.product_id
      );

      if (existingItem) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.product_id !== currentItem.product_id
        );
      } else {
        state.selectedItems.push(currentItem);
      }
    },

    toggleSelectAll: (state) => {
      if (allAvailableItemsSelected(state)) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.items.filter(
          (item) => item.amount <= item.stock_quantity
        );
      }
    },

    updateItemAmount: (
      state,
      action: PayloadAction<{ product_id: number; amount: number }>
    ) => {
      const { product_id, amount } = action.payload;
      const item = state.items.find((i) => i.product_id === product_id);

      if (item) {
        item.amount = amount;

        // 선택한 상품도 업데이트
        const selectedItem = state.selectedItems.find(
          (selected) => selected.product_id === product_id
        );
        if (selectedItem) {
          selectedItem.amount = amount;
        }
      }
    },

    deleteItem: (state, action: PayloadAction<number>) => {
      const product_id = action.payload;
      state.items = state.items.filter(
        (item) => item.product_id !== product_id
      );
    },
    deleteSelected: (state) => {
      const selectedItemIds = state.selectedItems.map(
        (item) => item.product_id
      );
      state.items = state.items.filter(
        (item) => !selectedItemIds.includes(item.product_id)
      );
      state.selectedItems = [];
    },

    resetSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {
  setItems,
  resetOrder,
  toggleSelectItem,
  toggleSelectAll,
  updateItemAmount,
  deleteItem,
  deleteSelected,
  resetSelectedItems,
  //   moveOrder,
  //   selectedOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
