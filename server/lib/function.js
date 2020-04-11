/*
 * @Author: Mr.Hope
 * @Date: 2019-08-30 23:40:54
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-18 23:12:24
 * @Description: function处理
 */
'use strict';

const fs = require('fs');
const { exec } = require('child_process');

// 读取当前版本号
const functionVersion = fs.readFileSync('./functionVersion.json', 'utf-8');

// 更新function版本号
fs.writeFileSync('./functionVersion.json', Number(functionVersion) + 1);

// 压缩文件
exec('"lib/7z" a -r function.zip @lib/function.txt');

const { client, putFile, putFolder } = require('ftp-hope');

// 连接客户端
client.connect(require('./loginDetail'));

client.on('ready', () => {
  putFolder('./function')
    .then(() => putFile('./functionVersion.json'))
    .then(() => putFile('./function.zip'))
    .then(() => {
      console.log('function 上传成功');
      client.end();
    });
});
