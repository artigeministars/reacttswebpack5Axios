import {AppDispatch} from "@storages/index";
import {useDispatch} from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
