import {postSliceReducer, PostState} from "@features/Posts/postSliceReducer";
import {LoggerMiddleware} from "@storages/middlewares";
import {
    createStore,
    combineReducers,
    applyMiddleware,
    Store,
    Middleware,
    Dispatch,
    StoreEnhancer,
    CombinedState
} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {commentsSliceReducer, CommentState} from "@features/comments/commentsSliceReducer";
import {postActionTypes} from "@features/Posts/actionTypes";
import {commentActionTypes} from "@features/comments/actionTypes";
import {AnyAction} from "redux";
// export const rootReducer: Reducer<CombinedState<{PostState: unknown}>, unknown> = combineReducers({
// export const rootReducer: CombinedState<RootState> = combineReducers({
export const rootReducer = combineReducers({
    posts: postSliceReducer,
    comments: commentsSliceReducer
});

// const middlewares: Middleware<Record<string, unknown>, RootState, Dispatch> = applyMiddleware(
const middlewares = applyMiddleware(thunkMiddleware, LoggerMiddleware);
const enhancers: StoreEnhancer = composeWithDevTools(middlewares);

export const store: Store<RootState | Record<string, unknown>, AnyAction> = createStore(
    rootReducer,
    enhancers
);

// export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = PostState & CommentState;
export type AppDispatch = typeof store.dispatch;
export type Actions = commentActionTypes | postActionTypes;
type DispatchType = (args: Actions) => Actions;
/*
export type Stores = Store<RootState, Actions> & {
    dispatch: AppDispatch;
};
*/

// todo : download react-logger and use another middleware too
