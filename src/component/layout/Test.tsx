import { ChangeEvent, useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../common/Loading";
import testInfo from "../../testInfo.json";
import TestInput from "../common/TestInput";

const Test: NextPage = () => {
    const [img, setImage] = useState("");
    const [gender, setGender] = useState("woman");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const name = String(router.query.name) || "nation";

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files[0]);
    };

    const onChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    const onSubmit = async () => {
        // 정상 파일 검사 후 post 요청
        if (img !== "") {
            const formData = new FormData();

            formData.append("img", img, String(Date.now()));

            axios
                .post(`${process.env.NEXT_PUBLIC_APIHOST}/image?gender=${gender}&testName=${name}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                })
                .then((response) => {
                    console.log(response);
                    setLoading(false);
                    router.push("/result");
                });

            setLoading(true);
        } else {
            window.alert("사진 파일 첨부 바랍니다.");
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <TestInput
                    img={img}
                    setLoading={setLoading}
                    onChange={onChange}
                    onChangeGender={onChangeGender}
                    onSubmit={onSubmit}
                    imgUrl={testInfo[name] && testInfo[name].imgUrl}
                    title={testInfo[name] && testInfo[name].title}
                    contentDetail={testInfo[name] && testInfo[name].contentDetail}
                    name={name}
                    gender={gender}
                />
            )}
        </>
    );
};

export default Test;
