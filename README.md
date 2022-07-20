* # anAlyst

  > Flow Week3 4분반 팀 김태훈, 김재민 

  * 인공지능 모델을 통해 자신의 스타일을 파악할 수 있는 웹 사이트입니다.
  * 남녀 구분이 있으며, "헤어스타일", "안경스타일", "퍼스널 컬러", "어느 나라에서 인기가 많을까?" 네 가지 테스트가 있습니다.  
  * 테스트를 하면 흥미로운 결과와 그에 맞는 이미지를 확인 할 수 있습니다. 
  * 테스트 결과를 카카오톡, 트위터, 인스타그램, 페이스북으로 공유를 할 수 있습니다.  

    ![1](https://user-images.githubusercontent.com/48674812/179931244-dc4a23fe-7290-4cfa-9f2a-4c851515c716.PNG)

  ***

  ### A. 개발 팀원  

  * 한양대학교 컴퓨터소프트웨어학부 [김태훈](https://github.com/twodf78)  
  * 고려대학교 정보대학 컴퓨터학과 [김재민](https://github.com/dev-jaemin)  

  ***

  ### B. 개발 환경  

  * Client: React.js(Typescript), Next.js

  * Server: Node.js(v16.16.0)  
  
  * DB: MySQL(v5.7.38)  
  
  * Deep Learning: Python(v3.6.9)
  
  ***
  
  ### C. 어플리케이션 소개  
  
  ### 1. BackEnd   
  
  ![2](https://user-images.githubusercontent.com/48674812/179931357-486b08b7-fe79-499c-96bc-a8d259e2c516.PNG)
  
  #### Major features   
  
  * client측에서 4개의 test, 남녀 성별 중 하나를 택하면, 그에 알맞는 결과를 python에서 도출한 다음 DB로 전송해 최종 결과를 받습니다.
    * client 측에서 온 이미지를 서버에서 받아주고, 인공지능 모델로 처리 한 후 처리 결과를 DB로 전송합니다.
    * DB에서 받아온 content text와 이미지 url를 client측으로 보내 사용자에게 최종 결과를 띄워줍니다.
  * 얼굴 인식 기능이 있어 사용자가 사진을 올릴 시 얼굴 부분만 사용하여 테스트를 합니다. 
    * 따라서 사물 사진을 올리거나 얼굴 정면 사진이 아닌 부분을 올릴 시 얼굴 인식을 할 수 없다고 뜹니다.
    * 또한 올린 사진들은 삭제하는 기능이 있어 사용자들의 개인정보를 폐기처리하고 있습니다.
  * model은 남녀, 테스트 4개 별로 8개가 존재하고, 각 model은 다른 데이터들을 사용하여 학습을 시켰습니다.
    * 또한 model마다 class명도 다른데, class명 별로 DB에는 다른 content들이 저장 되어 있고, image 파일들도 저장 되어 있어서 다채로운 결과를 획득할 수 있습니다.
  
  
  ***
  
  #### 기술 설명  
  
  * node.js에서 python파일 호출:

    * node.js에서 python 파일을 부를 때, child_process를 활용해서 새로운 process에서 실행되게끔 합니다.

    * 해당 작업은 동기와 비동기 작업으로 나눠지는 데, 얼굴 인식 후 도출 된 결과를 인공지능 모델에서로의 입력으로 사용할 것이기에 순서가 중요합니다. 따라서 spawnSync라는 함수를 사용해 동기 적 실행을 해야합니다.

      
  
  * CORS:
  
    * 특정 ip나 도메인에서 부터 온 request만 해당 서버로 요청을 보낼 수 있게끔 해줬습니다.
    * req의 header를 검사하여, 허용시킨 ip나 도메인이 맞다면, res의 header에 해당 header를 추가해줬습니다.

    ```javascript
    if (host.includes(req.headers.origin)) header["Access-Control-Allow-Origin"] = req.headers.origin;
    ```
  
    
  
  * 사진 저장 및 삭제:
  
    * imageController에서 사진 저장을 수행할 때, 각 이미지 파일의 이름을 Date.now()함수로 지정하여 모든 파일들에게 고유하게 식별이 될 수 있도록 하였습니다.
  
    * pickTheFace.py로 저장 된 사진을 얼굴만 따오고 또 다른 이름을 저장 시킵니다. 해당 python파일로 사진을 저장 할 수 없는 경우, 즉 얼굴을 인식 할 수 없는 경우, 얼굴 인식을 할 수 없다는 message를 곧바로 return 합니다.
  
    * return 하기 전에 fs.unlink()함수로 사진들을 다 확실히 삭제합니다.
  
      
  
  * SSL 인증서:
  
    * 보안을 위해 https request를 허용합니다. 우선 해당 ip에 도메인을 부여합니다. 그 후 해당 도메인에 맞는 SSL 인증서를 발급하여, createServer함수를 쓸 때, 해당 인증서들의 내용들을 부여합니다.
  
    * 따라서 query문도 딱 하나 밖에 없습니다. 
  
      
  
  * 파일 위치:
  
    * 모든 다른 파일들의 위치 지정은 npm start로 실행되는 파일 기준으로 합니다.
    * 따라서 export된 파일들, python 파일 포함해서 전부 index.js파일을 기준으로 하여 다른 호출할 파일들의 위치를 지정합니다.
  
    
  
  * JSON object:
  
    * JSON object를 적극적으로 활용하여, 다른 파일들을 import 후 export된 함수들을 호출할 때, 인자로 각 key에 맞는 값을 넣어준 JSON object를 전달하였습니다.
  
    ```javascript
    let result = {
        gender: params.gender,
        class: params.testName,
        content: "No face",
        img: "https://192.249.19.184:443/img/no-result.png",
    };
    ```
  
    ```javascript
    const params = {
        name: "",
        gender: "",
        testName: "",
        fileName: "",
        ext: "",
    };
    //...
    params.name = name + ext;
    params.gender = req.query.gender;
    params.testName = req.query.testName;
    params.fileName = name;
    params.ext = ext;
    ```
  
    
  
  ***
  
  #### 주요기술: Connection Between Node.js & Python
  
  
  * Call:
  
      * 호출은 child_process와 spawnSync를 통해서 진행합니다. 
      * spawnSync에 인자를 두개 넘겨주는 데, 어떤 파일 형식인지에 대한 값 하나와, 파일 명과 파일에 전달할 인자들을 리스트 형식으로 담은 값 하나를 넘겨준다.
  
      ```javascript
      const faceResult = child_process.spawnSync("python", [`./src/anAlyst/pickTheFace.py`, params.fileName, params.ext]);
      
      ...
      
      const pyResult = child_process.spawnSync("python", [`./src/anAlyst/kerasModel.py`, faceFileName, params.testName + "-" + params.gender]);
      ```
  
  
  * Return:
  
  
    * python파일에서 받은 값을 node.js에서 처리할 때는 stdout을 활용한다. 우선 python 파일 측에서 node.js로 넘겨주고 싶은 결과값을 print()로 출력을 시킨다. python 파일의 실행이 끝나면 node.js 측에서 stdout.toString() 함수를 활용해서 python파일 출력값을 가져온다.
  
    ```javascript
    let faceFileName = faceResult.stdout.toString().replace("\n", "");
    
    ...
    
    let className = pyResult.stdout.toString().slice(147).slice(0, -2);
    ```
  
    
  
  

***

  ### 2. Frontend

  #### Major features   

  * 라이브러리없이 css와 js로 홈페이지의 애니메이션을 구현했습니다.
  * 가로 길이 360px이상인 모든 기기에서 잘 보이도록 반응형 디자인으로 구현했습니다.
  * Next.js을 이용해 서버 사이드 렌더링으로 배포했습니다.(Chrome Lighthouse 검사 시 SEO 100점)
  * typescript 사용으로 유지보수 시 좀 더 쉽게 할 수 있습니다.

***

  #### 주요기술:


  * 애니메이션 구현

    * pageYOffset를 추적하는 Custom Hook을 만들었습니다.
    * transform, opacity css 값에 pageYOffset를 넣거나, useEffect에서  동적으로 해당 값이 바뀌도록 했습니다.
    * transition을 사용해서 자연스럽게 넘어가도록 했습니다.
    
  ```javascript
    useEffect(() => {
        // first section animation
        firstSectionRef.current && (firstSectionRef.current.style.opacity = String(-scroll.scrollY / 1000 + 1));

        // second section animation
        if (scroll.scrollY < screen.availHeight * 3 && scroll.scrollY > screen.availHeight) {
            secondSectionRef.current && (secondSectionRef.current.style.opacity = String(scroll.scrollY / 1000));
        } else {
            secondSectionRef.current && (secondSectionRef.current.style.opacity = String(-scroll.scrollY / 1000));
        }

        // second h3 animation
        h3Refs.forEach((ref, index) => {
            ref.current && (ref.current.style.opacity = String(scroll.scrollY / screen.height - 1 - 0.5 * index));
        });

        // down-arrow hide
        if (scroll.scrollY > screen.availHeight * 4) {
            downArrowRef.current && (downArrowRef.current.style.opacity = "0");
        } else {
            downArrowRef.current && (downArrowRef.current.style.opacity = "1");
        }
    }, [scroll.scrollY]);
  ```
  
  ![animation](https://user-images.githubusercontent.com/43535460/179943198-e93822eb-655d-4793-a365-41487090804b.gif)



  * 반응형 디자인 구현 

    * 상단 네비게이션 바는 css만으로 구현했습니다.
    * 컨텐츠 부분은 material ui 라이브러리의 Grid를 사용하여 구현했습니다.
    
  ![main](https://user-images.githubusercontent.com/43535460/179959505-00c9e62d-1723-4149-9f10-07d742ea0edc.png)
  ![result](https://user-images.githubusercontent.com/43535460/179959609-c93c9653-82d1-4a84-915f-add9ed34b1b3.png)
  ![main-mobile](https://user-images.githubusercontent.com/43535460/179959916-06770bfe-66a3-4548-9fa6-438544354bea.png)
  ![result-mobile](https://user-images.githubusercontent.com/43535460/179959626-35dd0015-c089-48da-8f1e-f95e55896f88.png)


***

