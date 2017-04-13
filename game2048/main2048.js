var board = new Array();   //用于显示数字

var score = 0;

$(document).ready(function() {
    newgame();
})

function newgame () {
    // 初始化棋盘格
    init();
    //再随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

/**
 * 初始化数据
 *  格子的显示，数值的初始化
 */
function init() {
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + "-" + j);
            gridCell.css('top', getPosTop(i,j));
            gridCell.css('left', getPosLeft(i,j));            
        }
    
    for( var i = 0; i < 4; i++) {
        board[i] = new Array(); //变成二维数组

        for( var j = 0; j < 4; j++) {
            board[i][j] = 0; //初始化值为0
        }
    }

    updateBoardView();
}

/**
 * 将number-cell显示数值，
 * 
 */
function updateBoardView() {

    $('.number-cell').remove();

    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+ i +'-'+ j +'" ></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if( board[i][j] === 0) { //数值为0的时候不显示
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                //并放在grid-cell中间
                theNumberCell.css('top', getPosTop(i,j) + 50);
                theNumberCell.css('left', getPosLeft(i,j) + 50);                
            } else {
                //跟grid-cell的位置相同
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i,j));
                theNumberCell.css('left', getPosLeft(i,j));   
                theNumberCell.css('background-color', getNumberBackGroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j]);
            }
        }

}

function generateOneNumber() {

    //判断是否还有空间生成
    if(nospace(board)) {
        return false;
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    while (true) {
        //可用
        if( board[randx][randy] === 0)
            break;
        
        // 不可用，继续生成
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }

    // 随机一个数字,50%的概率生成2， 50%的概率生成4
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    // 在随机位置显示随机数
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

$(document).keydown( function(event) {
    switch(event.keyCode) {
        case 37: //left
            if( moveLeft() ) {
                generateOneNumber(); //如果可以向左移动，随后生成一个数
                isgameover();//判断游戏是否结束
            } 
            break;
        case 38: //up
            if( moveUp() ) {
                generateOneNumber();
                isgameover();
            } 
            break;
        case 39: //right
            if( moveRight() ) {
                generateOneNumber();
                isgameover();
            } 
            break;
        case 40: //down
            if( moveDown() ) {
                generateOneNumber();
                isgameover();
            } 
            break;
        default: 
            break;
    }
})

function isgameover() {

}

function moveLeft() {

    if ( !canMoveLeft(board) ) 
        return false;

    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++) {
            if(board[i][j] !=0 ) {//当前格子有数值

                //这个格子左侧
                for(var k = 0; k < j; k++) {
                    //左侧格子为0， 并且中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move 
                        shawMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
                        //上面条件表示和左侧数值相同，并且中间没有障碍物

                        //move
                        shawMoveAnimation(i, j, i, k);
                        //add 
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }

    setTimeout(updateBoardView, 200);

    return true;
}



