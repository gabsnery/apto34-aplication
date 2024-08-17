import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  createMigrate,
  PersistedState, persistReducer,
  persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { defaultApi } from './api/default';
import rootReducer from "./rootReducer";
import setSnackbarMiddleware from "middlewares/setSnackbarMiddleware";
import googleAnalyticsMiddleware from "middlewares/googleAnalyticsMiddleware";

const migrations = {
  0: (state: PersistedState) => {
    return {
      _persist: {
        rehydrated: true,
        version: state?._persist?.version ?? 0,
      },
    };
  },
};

const persistConfig = {
  key: "primary",
  version: 15,
  storage,
  migrate: createMigrate(migrations, { debug: false }),
  whitelist: [
    "auth","cart",'theme','language'
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    setSnackbarMiddleware,
    googleAnalyticsMiddleware,
    defaultApi.middleware
  ],
});




type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();

const persistor = persistStore(store);

export { persistor };

