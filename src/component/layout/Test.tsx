import { ChangeEvent, useState, useRef, useEffect } from "react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Loading from "../common/Loading";
import TestInput from "../common/TestInput";
import Result from "../common/Result";

import testInfo from "../../testInfo.json";

type resultDataType = {
    class: string;
    content: string;
    gender: string;
};

const Test: NextPage = () => {
    const [img, setImage] = useState<Blob>();
    const [gender, setGender] = useState("woman");
    const [loading, setLoading] = useState(false);
    const [loadComplete, setLoadComplete] = useState(false);
    const [resultData, setResultData] = useState<resultDataType>();
    const router = useRouter();
    const wrapper = useRef<HTMLDivElement>();
    const imgAttachAlarm = useRef<HTMLDivElement>();

    const name = String(router.query.name) || "nation";

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImage(e.target.files[0]);
        imgAttachAlarm.current && (imgAttachAlarm.current.style.display = "inline-block");
    };

    const onChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    const onSubmit = async () => {
        // 정상 파일 검사 후 post 요청
        if (img) {
            const formData = new FormData();

            formData.append("img", img, String(Date.now()));

            axios
                .post(`${process.env.NEXT_PUBLIC_APIHOST}/image?gender=${gender}&testName=${name}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                })
                .then((response) => {
                    console.log(response.data);
                    setResultData(response.data);
                    setLoading(false);
                    setLoadComplete(true);
                });

            setLoading(true);
        } else {
            window.alert("사진 파일 첨부 바랍니다.");
        }
    };

    // name이 바뀌면 초기화 시키기
    useEffect(() => {
        setLoading(false);
        setLoadComplete(false);
    }, [name]);

    // 페이지 변경 애니메이션 처리
    useEffect(() => {
        wrapper.current && (wrapper.current.style.opacity = "0");
        setTimeout(() => {
            wrapper.current && (wrapper.current.style.transition = "opacity 2s ease");
            wrapper.current && (wrapper.current.style.opacity = "1");
        }, 100);
        wrapper.current && (wrapper.current.style.transition = "none");
    }, [name, loading, loadComplete]);

    return (
        <>
            <div className="test_wrapper" ref={wrapper as React.RefObject<HTMLDivElement>}>
                {loading ? <Loading /> : ""}
                {!(loading || loadComplete) ? (
                    <TestInput
                        setLoading={setLoading}
                        onChange={onChange}
                        onChangeGender={onChangeGender}
                        onSubmit={onSubmit}
                        imgUrl={testInfo[name as keyof typeof testInfo] && testInfo[name as keyof typeof testInfo].imgUrl}
                        title={testInfo[name as keyof typeof testInfo] && testInfo[name as keyof typeof testInfo].title}
                        contentDetail={testInfo[name as keyof typeof testInfo] && testInfo[name as keyof typeof testInfo].contentDetail}
                        name={name}
                        gender={gender}
                        imgAttachAlarm={imgAttachAlarm as React.RefObject<HTMLDivElement>}
                    />
                ) : (
                    ""
                )}
                {loadComplete ? (
                    <Result
                        resultData={resultData as resultDataType}
                        title={testInfo[name as keyof typeof testInfo] && testInfo[name as keyof typeof testInfo].title}
                        name={name}
                        subtitle={testInfo[name as keyof typeof testInfo] && testInfo[name as keyof typeof testInfo].subtitle}
                        imgUrl={testInfo[name as keyof typeof testInfo] && testInfo[name as keyof typeof testInfo].imgUrl}
                        setLoadComplete={setLoadComplete}
                    />
                ) : (
                    ""
                )}
            </div>
            <style jsx>{`
                .test_wrapper {
                    padding: 4rem 1rem;
                }
            `}</style>
        </>
    );
};

export default Test;
