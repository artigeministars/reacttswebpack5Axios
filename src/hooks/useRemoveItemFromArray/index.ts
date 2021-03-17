import IPost from "@domain/models/Post";

type genericType = IPost;

export const useRemoveItemFromArray = (arr: Array<genericType>, rItem: genericType) => {
    return arr.filter((item) => item.id !== rItem.id);
};
