const fs = require("fs");
// const data = fs.readFileSync("./tokens.json");
// const truensArray = Array.from(JSON.parse(data));
// // truensObject.forEach((truen) => {
// //   console.log(truen.token);
// // });
// let tokenArr = [];
// for (let truen = 0; truen < truensArray.length; truen++) {
//   tokenArr.push(truensArray[truen].token);
// }
// console.log(`Token Sayınız: ${truensArray.length}`);
// console.log(tokenArr.join("\n"));
const setTitle = require("node-bash-title");

console.clear();
setTitle("Discord Token (Generator)");
console.log(
  "İsim           Şifre           Token                                                         Durum           Mail"
);
if (fs.existsSync("./accounts.json")) {
  let tokenList = require("./accounts.json");
  for (let a = 0; a < tokenList.length; a++) {
    for (let i = tokenList[a].username.length; i <= 13; i++) {
      tokenList[a].username += " ";
    }
    for (let i = tokenList[a].password.length; i <= 13; i++) {
      tokenList[a].password += " ";
    }
    for (let i = tokenList[a].status.length; i <= 14; i++) {
      tokenList[a].status += " ";
    }

    console.log(
      tokenList[a].username.slice(0, 13) +
        "  " +
        tokenList[a].password.slice(0, 16) +
        "  " +
        tokenList[a].token.slice(0, 62) +
        "   " +
        tokenList[a].status.slice(0, 16) +
        " " +
        tokenList[a].mail.slice(0, 36)
    );
  }
}
