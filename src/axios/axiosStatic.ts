import axios from "axios";

export const validateEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios({
        method: "GET",
        url: "https://email-checker.p.rapidapi.com/verify/v1",
        headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "email-checker.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY
        },
        params: {
            //  email: encodeURI(email)
        }
    })
        .then(({data}) => {
            //   setEmailStatus(data.status)
            //   setValidationReason(data.reason)
        })
        .catch((error) => {
            console.log(error);
        });
};
