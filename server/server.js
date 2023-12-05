const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

const indexRouter = require('./Router/test');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let corsOptions = {
    origin: "*", // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', indexRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + "에서 응답을 기다리는 중...");
});