import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItemType } from "../../types";

// 선택된 아이템들을 sessionStorage에 저장하는 함수
const saveToSessionStorage = (selectedItems: CartItemType[]) => {
  sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
};

// sessionStorage에서 선택된 아이템들을 불러오는 함수
const loadFromSessionStorage = (): CartItemType[] => {
  const savedData = sessionStorage.getItem("selectedItems");
  return savedData ? JSON.parse(savedData) : [];
};

declare interface CartState {
  items: CartItemType[];
  selectedItems: CartItemType[];
  order: CartItemType[];
}

//items는 장바구니 데이터, selectedItems는 현재 장바구니에서 선택된 데이터, order는 결제페이지에서 확인하는 데이터입니다.
const initialState: CartState = {
  items: [], //장바구니에 보여질화면
  selectedItems: loadFromSessionStorage(),
  order: [], //결제화면에 보여줄 아이템들
};

const allAvailableItemsSelected = (state: CartState) => {
  const availableItems = state.items.filter(
    (item) => item.amount <= item.storage
  );
  return availableItems.every((item) =>
    state.selectedItems.some((selectedItem) => selectedItem.id === item.id)
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
        (item) => item.id === currentItem.id
      );

      if (existingItem) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== currentItem.id
        );
      } else {
        state.selectedItems.push(currentItem);
      }

      saveToSessionStorage(state.selectedItems);
    },
    // toggleSelectItem: (state, action: PayloadAction<CartItemType>) => {
    //   const currentItem = action.payload;
    //   const existingItemIndex = state.selectedItems.findIndex(
    //     (item) => item.id === currentItem.id
    //   );

    //   if (existingItemIndex !== -1) {
    //     // state.selectedItems.splice(existingItemIndex, 1);
    //     state.selectedItems = state.selectedItems.filter(
    //       (item) => item.id !== currentItem.id
    //     );
    //   } else {
    //     state.selectedItems.push(currentItem);
    //   }
    // },
    // selectItem: (state, action: PayloadAction<CartItemType>) => {
    //   const currentItem = action.payload;
    //   const existingItem = state.items.find(
    //     (item) => item.id === currentItem.id
    //   );
    //   if (existingItem && !state.selectedItems.includes(existingItem)) {
    //     state.selectedItems.push(existingItem);
    //   }
    // },
    // deselectItem: (state, action: PayloadAction<number>) => {
    //   const id = action.payload;
    //   state.selectedItems = state.selectedItems.filter(
    //     (item) => item.id !== id
    //   );
    // },

    // toggleSelectAll: (state) => {
    //   if (state.selectedItems.length !== state.items.length) {
    //     state.selectedItems = [...state.items];
    //   } else {
    //     state.selectedItems = [];
    //   }
    // },
    toggleSelectAll: (state) => {
      if (allAvailableItemsSelected(state)) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.items.filter(
          (item) => item.amount <= item.storage
        );
      }

      saveToSessionStorage(state.selectedItems);
    },

    // toggleSelectAll: (state) => {
    //   if (state.selectedItems.length === state.items.length) {
    //     state.selectedItems = [];
    //   } else {
    //     state.selectedItems = [...state.items];
    //   }
    // },
    // selectAllItems: (state) => {
    //   state.selectedItems = [...state.items];
    // },
    // deselectAllItems: (state) => {
    //   state.selectedItems = [];
    // },

    updateItemAmount: (
      state,
      action: PayloadAction<{ id: number; amount: number }>
    ) => {
      const { id, amount } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.amount = amount;

        // 선택한 상품도 업데이트
        const selectedItem = state.selectedItems.find(
          (selected) => selected.id === id
        );
        if (selectedItem) {
          selectedItem.amount = amount;
        }
      }
    },

    // incrementQuantity: (state, action: PayloadAction<number>) => {
    //   const id = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   if (item) {
    //     item.amount += 1;
    //     const selectedItem = state.selectedItems.find(
    //       (selected) => selected.id === id
    //     );
    //     if (selectedItem) {
    //       selectedItem.amount = item.amount;
    //     }
    //   }
    // },
    // decrementQuantity: (state, action: PayloadAction<number>) => {
    //   const id = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   if (item && item.amount > 1) {
    //     item.amount -= 1;
    //     const selectedItem = state.selectedItems.find(
    //       (selected) => selected.id === id
    //     );
    //     if (selectedItem) {
    //       selectedItem.amount = item.amount;
    //     }
    //   }
    // },

    deleteItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    // deleteAll: (state) => {
    //   state.items = [];
    //   state.selectedItems = [];
    // },
    deleteSelected: (state) => {
      const selectedItemIds = state.selectedItems.map((item) => item.id);
      state.items = state.items.filter(
        (item) => !selectedItemIds.includes(item.id)
      );
      state.selectedItems = [];
    },

    resetSelectedItems: (state) => {
      state.selectedItems = [];
    },
    // moveOrder: (state) => {
    //   state.order = state.selectedItems.map((item) => ({
    //     amount: item.amount,
    //     optionDetail: item.optionDetail,
    //     productIdx: item.productIdx,
    //   }));
    //   console.log(state.order);
    // },
    // selectedOrder: (state, action) => {
    //   const orderItem = state.items.find((item) => item.id === action.payload);
    //   const { amount, optionDetail, productIdx } = orderItem as OrderItem;
    //   state.order = [{ amount, optionDetail, productIdx }];
    // },
  },
});

export const {
  setItems,
  resetOrder,
  toggleSelectItem,
  // selectItem,
  // deselectItem,
  toggleSelectAll,
  // selectAllItems,
  // deselectAllItems,
  updateItemAmount,
  //   incrementQuantity,
  //   decrementQuantity,
  deleteItem,
  // deleteAll,
  deleteSelected,
  resetSelectedItems,
  //   moveOrder,
  //   selectedOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
