git submodule update --remote              

# home-idp-ui
frontend for home-idp open source software



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


9/19 졸프미팅1
플랫폼 엔지니어링

기능적인 부분들 정의, 데브옵스 정의
데브옵스의 특징 중 해결되지 않은 이슈들 버그, 복잡도 등 분석 및 정리

그래서 이런 이슈들로 인해 플래폼 엔지니어링이 대두된 상황 설명
플랫폼 엔지니어링에서 데브옵스의 

논문 양식대로 작성해야함
개발/데모보다는 문제분석과 어떤 알고리즘과 어떤 방식으로 어떻게 데브옵스의 문제를 해결하였는지를 논문으로 증명해야함

주제 ; 뭐를 위한 플랫폼 엔지니어링인지, 특징(대상, 가볍다, 효율적이다 등)
도메인이나 문제점을 해결하기 위한 

목요일 5시반마다 매주 졸업프로젝트 미팅

9/27 졸프미팅2

데브옵스의 복잡성을 해결하기 위한 도구로 플랫폼 엔지니어링이 대두되고 사용되는데, 이를 어떻게 논문으로 수치화해서 증명해야하는 것인지?
데브옵스의 인지부하를 최소화하고 개발자들이 로직에 집중할 수 있도록 해주는 플랫폼 엔지니어링

backstage라는 IDP 구축 오픈소스 소프트웨어가 존재하는데, 
backstage를 사용하기 위해서는 다양한 YAML 형식의 파일들을 통해서 데이터를 주입해야하고, 데이터 모델들이 지정되어있다는 것이다

2. 지정된 데이터 모델
Component
Resource
API
User
Group
System, and 
Domain



특정 환경으로 고정

클라우드 네이티브 어플리케이션을 위한 IDP 엔지니어링
쿠버네티스 기반으로 개발할 때 필요한 것을 리스트업
자동화 되지 않고 사람이 하는 것들을 리스트업해서 어떤 부분을 특화해서 해결할지
쿠버네티스의 오케스트레이션 기술에서 제공되지 않는 부분들을 조사
