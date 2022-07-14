import { ChangeEvent, useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../common/Loading";

import style from "./Test.module.css";

const Test: NextPage = () => {
    const [img, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files[0]);
    };

    const onClick = async () => {
        const formData = new FormData();
        formData.append("img", img);

        axios
            .post(`${process.env.NEXT_PUBLIC_APIHOST}/image`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                setLoading(false);
                router.push("/result");
            });

        setLoading(true);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={onChange} />
            <button onClick={onClick}>제출</button>
            {loading && <Loading />}
        </div>
    );
};

export default Test;
