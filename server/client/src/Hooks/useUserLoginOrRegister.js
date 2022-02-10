import axios from "axios";
import {
    useRef
} from "react";

export default function useUserLoginOrRegister(url, setAuth) {
    const email = useRef("")
    const password = useRef("")
    const confirmPassword = useRef("")
    const STORAGE_KEY = "userDetails"

    function getAxios() {
        axios.post(url, {
                email: email.current.value,
                password: password.current.value,
                confirmPassword: confirmPassword.current.value
            })
            .then(res => {
                setAuth(res.data)

                localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data))
                console.log(res)
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    return {
        email,
        password,
        confirmPassword,
        getAxios
    }
}