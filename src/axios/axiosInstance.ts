import axios from "axios";
import {POST_CONSTANTS} from "@constants/PostConstants";

export const baseAxios = axios.create({
    baseURL: POST_CONSTANTS.POSTBASEURL
});
