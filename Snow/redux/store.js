import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import weatherReducer from './modules/weatherSlice'
import userReducer from './modules/userSlice'

// export const history = useNavigate();

const middlewares = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  })
];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    user: userReducer,
    // router: ConnectedRouter(history)
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: middlewares,
})