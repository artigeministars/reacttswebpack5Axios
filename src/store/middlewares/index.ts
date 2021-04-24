import type {RootState} from "@storages/index";
import {Middleware} from "redux";

export const LoggerMiddleware: Middleware<Record<string, unknown>, RootState> = (storeApi) => (
    next
) => (action) => {
    console.info("Dispatching", action);
    const result = next(action);
    console.log("next state", storeApi.getState());
    return result;
};
