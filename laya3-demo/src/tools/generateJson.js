var fs = require('fs');

/**写入文件，会完全替换JSON文件中的内容 */
function writeJsonData(value, fileName = "test") {
    var str = JSON.stringify(value, "", "\t");
    fs.writeFile('./bin/json/' + fileName + '.json', str, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('写入成功!');
    })
}

/** 生成json数据 */
function generatemailListJsonData() {
    var jsonData = {
        "mailList": []
    };

    for (let i = 0; i < 31; i++) {
        let Data = {};
        Data.mailTitle = { "text": "这里是邮件的标题" + i };
        if (i > 21) {
            Data.mailDateTime = { "text": "2022-08-0" + (31 - i) + " 00:00" };
        } else {
            Data.mailDateTime = { "text": "2022-08-" + (31 - i) + " 00:00" };
        }
        Data.opt = { "visible": false };
        Data.flagStatus = { "skin": "comp/img_mail.png" };
        Data.flagBtn = { "label": "标为已读", "labelColors": "#000000,#000000,#000000" };
        jsonData.mailList[i] = Data;
    }
    // console.log(JSON.stringify(jsonData));
    writeJsonData(jsonData, "mailList");
}

/** 生成背包json数据 */
function generateBagListJsonData() {
    var jsonData = {
        "bagList": []
    };

    for (let i = 0, Data; i < 54; i++) {
        Data = {
            "listItemImg": { "skin": "bag/" + i + ".png" },
            "listItemNumber": { "text": Math.floor((Math.random() * 99) + 1) },
            "readme": "宝物说明, 此处省略100字…………………………"
        }
    }
    Data.flagBtn = { "label": "标为已读", "labelColors": "#000000,#000000,#000000" };
    writeJsonData(jsonData, "bagList");
    jsonData.bagList[i] = Data;
}

generatemailListJsonData();