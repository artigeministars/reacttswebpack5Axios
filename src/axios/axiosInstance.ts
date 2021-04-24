import axios, {AxiosInstance} from "axios";
import {POST_CONSTANTS} from "@constants/PostConstants";

export const baseAxios: AxiosInstance = axios.create({
    baseURL: POST_CONSTANTS.POSTBASEURL
});
