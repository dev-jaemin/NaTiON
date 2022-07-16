import { ChangeEvent, useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../common/Loading";
import testInfo from "../../testInfo.json";

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

    const onClick = async () => {
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
            {loading ? <Loading /> : ""}
            <div className={"test_wrapper" + (loading ? " none" : "")}>
                <div style={{ margin: "2rem" }}>
                    <img src={testInfo[name] && testInfo[name].imgUrl} width="500px" alt="사진" />
                </div>
                <h1>{testInfo[name] && testInfo[name].title}</h1>
                <p>
                    사실은 뭐 그런것은 아니고 그냥 테스트 한 번 해보면 좋을 것 같아서 걍 해봤어요. <br />
                    집에 가고 싶다 너무 집에 가고 싶다. <br />
                    생각해보니까 글씨체도 적당한 걸로 바꾸면 좋을 것 같은데 뭘로 바꿔야 할까 <br />
                    그림도 그냥 그림보단 움짤로 넣는 것이 좋을 듯 <br />
                    이정도 길이로 쓰면 적당할 듯????
                </p>
                <div>
                    <h5>성별을 선택해주세요.</h5>
                    <input id="select_gender" name="select_gender" value="woman" type="radio" onChange={onChangeGender} defaultChecked />
                    <label>여성</label>
                    <input id="select_gender" name="select_gender" value="man" type="radio" onChange={onChangeGender} />
                    <label>남성</label>
                </div>

                <div style={{ margin: "30px" }}>
                    <div className="file_input_area">
                        <input type="file" id="input-file" accept="image/*" style={{ visibility: "hidden" }} onChange={onChange} />
                        <div>사진 파일 드래그</div>
                    </div>
                    <label className="file_input_button" htmlFor="input-file">
                        혹은 이 버튼으로 업로드
                    </label>
                </div>
                <p>
                    안심하세요. <br />
                    저희는 완전히 학습된 머신러닝 모델을 사용합니다. <br />
                    사용자의 이미지는 절대 서버에 저장 및 모델 학습에 사용되지 않습니다.
                </p>
                <button className="submit_btn" onClick={onClick}>
                    제출
                </button>
                {loading && <Loading />}
            </div>
            <style jsx>{`
                .test_wrapper {
                    color: #ffffff;
                    background: linear-gradient(45deg, DarkBlue, Black);
                    padding: 2rem;
                }
                .submit_btn {
                    border: 1px solid #ffffff;
                    border-radius: 5px;
                    background: none;
                    color: #ffffff;
                    display: block;
                    padding: 5px 20px;
                    margin: 0 auto;
                }
                .file_input_button {
                    cursor: pointer;
                }
                .file_input_area {
                    border: 1px solid #ffffff;
                    text-align: center;
                    display: inline-block;
                    font-size: 0.5rem;
                }
                #input-file {
                    padding: 10px;
                    width: 100%;
                    display: block;
                }
                .none {
                    display: none;
                }
            `}</style>
        </>
    );
};

export default Test;
