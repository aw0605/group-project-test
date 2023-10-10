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

      saveToSessionStorage(state.selectedItems);
    },
    // toggleSelectItem: (state, action: PayloadAction<CartItemType>) => {
    //   const currentItem = action.payload;
    //   const existingItemIndex = state.selectedItems.findIndex(
    //     (item) => item.product_id === currentItem.product_id
    //   );

    //   if (existingItemIndex !== -1) {
    //     // state.selectedItems.splice(existingItemIndex, 1);
    //     state.selectedItems = state.selectedItems.filter(
    //       (item) => item.product_id !== currentItem.product_id
    //     );
    //   } else {
    //     state.selectedItems.push(currentItem);
    //   }
    // },
    // selectItem: (state, action: PayloadAction<CartItemType>) => {
    //   const currentItem = action.payload;
    //   const existingItem = state.items.find(
    //     (item) => item.product_id === currentItem.product_id
    //   );
    //   if (existingItem && !state.selectedItems.includes(existingItem)) {
    //     state.selectedItems.push(existingItem);
    //   }
    // },
    // deselectItem: (state, action: PayloadAction<number>) => {
    //   const product_id = action.payload;
    //   state.selectedItems = state.selectedItems.filter(
    //     (item) => item.product_id !== product_id
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
          (item) => item.amount <= item.stock_quantity
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

    // incrementQuantity: (state, action: PayloadAction<number>) => {
    //   const product_id = action.payload;
    //   const item = state.items.find((item) => item.product_id === product_id);
    //   if (item) {
    //     item.amount += 1;
    //     const selectedItem = state.selectedItems.find(
    //       (selected) => selected.product_id === product_id
    //     );
    //     if (selectedItem) {
    //       selectedItem.amount = item.amount;
    //     }
    //   }
    // },
    // decrementQuantity: (state, action: PayloadAction<number>) => {
    //   const product_id = action.payload;
    //   const item = state.items.find((item) => item.product_id === product_id);
    //   if (item && item.amount > 1) {
    //     item.amount -= 1;
    //     const selectedItem = state.selectedItems.find(
    //       (selected) => selected.product_id === product_id
    //     );
    //     if (selectedItem) {
    //       selectedItem.amount = item.amount;
    //     }
    //   }
    // },

    deleteItem: (state, action: PayloadAction<number>) => {
      const product_id = action.payload;
      state.items = state.items.filter(
        (item) => item.product_id !== product_id
      );
    },
    // deleteAll: (state) => {
    //   state.items = [];
    //   state.selectedItems = [];
    // },
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
    // moveOrder: (state) => {
    //   state.order = state.selectedItems.map((item) => ({
    //     amount: item.amount,
    //     product_idx: item.product_idx,
    //   }));
    //   console.log(state.order);
    // },
    // selectedOrder: (state, action) => {
    //   const orderItem = state.items.find((item) => item.product_id === action.payload);
    //   const { amount, item.product_idx } = orderItem as OrderItem;
    //   state.order = [{ amount, product_idx }];
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
