window.onload = () => {
    initStatus();
    drawCube();
    logo();
    help();
};

function logo() {
    console.clear();
    console.style('<css="font-size:50px;color:#6155a6;">Cube Simulator</css>');
    console.style(`Developed by <b>Xecades</b>, Website: <b>https://xecades.xyz/</b>`);
}

function help() {
    console.style(`<b>*</b> 或许更好的阅读体验:
 http://blog.xecades.xyz/articles/CubeSimulator`)
    console.style(`<b="color:#6155a6;">[帮助]</b>
     网页显示的魔方展开图中, 蓝色表示正面.
     我们使用 \"F, L, R, U, D, B, f, l, r, u, d, b\" 来表示对魔方的操
 作, 大写表示该面顺时针旋转,小写表示逆时针旋转, 其中字母:

     <b>F</b> (Front) 对应正面 (蓝色);   <b>B</b> (Back) 对应背面 (绿色);
     <b>L</b> (Left) 对应左面 (橙色);    <b>R</b> (Right) 对应右面 (红色);
     <b>U</b> (Up) 对应上面 (黄色);      <b>D</b> (Down) 对应下面 (白色).
    
     在下方控制台输入以下函数控制魔方:
     
     <b>launch(str)</b>            > 执行 str 对应的指令, 其中 str 为要执
                           行的指令 (需要引号).
                           例如: launch("RU") 表示执行操作 RU 一次.
     <b>loopTest(str, bound)</b>   > 循环执行 str 指令 bound 次, 并输出魔
                           方复原所需的次数 (用于研究), 其中 str 为
                           执行的命令, bound 为执行的次数.
                              例如: loopTest("RU", 200) 表示执行
                           RU 共 200 次.
     <b>reset()</b>                > 重置魔方, 将魔方恢复到复原的状态.
     <b>countChanges()</b>         > 显示魔方各块的变化情况 (用于研究), 
                           输出结果可以用于绘制有向图, 绘制工具见末
                           尾.
     <b>toggleNumberDisplay()</b>  > 切换显示 / 不显示方块编号.
     <b>switchColor(mark)</b>      > 选择魔方的配色, 其中 mark 为配色编号,
                           目前可供选择的编号为 1 ~ ${COLOR.length - 1}, 默认为 1.

<b="color:#6155a6;">[例子]</b>
     下面举一些常用的例子:
     
     <b>大中小花式</b>: launch("FDDLLBDbFFuFUFFUUfLDfU")
     <b>马赛克花式</b>: launch("RRUULLDDRRUULLDDRRUULLDD")
     <b>"上左" 还原测试</b>: loopTest("RU", 500)
     <b>"上右" 还原测试</b>: loopTest("Ru", 500)
     
     
<b>^</b> 图论绘图工具 csacademy: https://csacademy.com/app/graph_editor/`);
}

function countChanges() {
    let mark = 0;
    let output = "";
    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 3; j++)
            for (let k = 0; k < 3; k++)
                if (stat[i][j][k] != ++mark)
                    output += `${stat[i][j][k]} ${mark}\n`;
    console.style(`<b="color:#6155a6;">[提示]</b> 共变换的方块: (例如: "a b" 表示原本在第 a 个位置的块到了第 b 个位置)`);
    console.log(output);
}

function launch(str) {
    if (!checkCommand(str)) {
        console.style(`<b="color:#ff4646;">[错误]</b> 对魔方的操作指令应只包含以下内容:\n \"F, L, R, U, D, B, f, l, r, u, d, b\".\n 请检查你的输入.`);
        return;
    }
    for (let i = 0; i < str.length; i++)
        runCommand(eval(`DIRECT.${str[i]}`));
    drawCube();
}

function reset() {
    let mark = 0;
    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 3; j++)
            for (let k = 0; k < 3; k++)
                stat[i][j][k] = ++mark;
    drawCube();
}

function loopTest(str, bound) {
    bound = Math.floor(bound);
    if (!checkCommand(str)) {
        console.style(`<b="color:#ff4646;">[错误]</b> 对魔方的操作指令应只包含以下内容:\n\"F, L, R, U, D, B, f, l, r, u, d, b\".\n请检查你的输入.`);
        return;
    }
    if (typeof bound != "number" || bound < 1) {
        console.style(`<b="color:#ff4646;">[错误]</b> loopTest(str, bound) 函数的 bound 参数应该为不小于 1 的整数.`);
        return;
    }
    console.style(`<b="color:#6155a6;">[提示]</b> 将对魔方进行 ${bound} 次 ${str} 操作.`);
    for (let i = 0; i < bound; i++) {
        setTimeout(() => {
            launch(str);
            if (checkInit())
                console.style(`魔方还原: 第 ${i + 1} 次循环.`);
            if (i == bound - 1)
                console.style("完成操作.");
        }, 10 * i);
    }
}

function toggleNumberDisplay() {
    DisplayNumber = !DisplayNumber;
    drawCube();
}

function switchColor(mark) {
    let len = COLOR.length - 1;
    mark = Math.floor(mark);
    if (typeof mark != "number" || mark < 1 || mark > len) {
        console.style(`<b="color:#ff4646;">[错误]</b> switchColor(mark) 函数的 mark 参数应该为 1 ~ ${len} 的整数.`);
        return;
    }
    console.style(`<b="color:#6155a6;">[提示]</b>更改配色为 #${mark} 号配色`);
    colorMark = mark;
    drawCube();
}