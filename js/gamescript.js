// This is a JavaScript file
var index = 0;
var base_speed = 25; 
var speed_x = 0;
var speed_y = 0;
var start_flg = false;
var acceleration = 0.985;
var acceleration_down = 0; // 加速度の値を徐々に下げるための値、加速度の加速度
var context;
var stage_number = 1;
var timer = 0;
var fall_flg = false; // ボールが落ちたかのフラグ
var difficulty = 1; // 難易度

const UP = 0;
const DOWN = 1;
const UPDOWN = 2;
const LEFTRIGHT = 3;
const ROTATE = 4;
const STATIC = 5;
const PARALLEL = 6;
const VERTICAL = 7;
const LEFT = 8;
const RIGHT = 9;
const SPEEDUP_DOWN = 10;
const SPEEDUP_UP = 11;
const SPEEDDOWN_DOWN = 12;
const SPEEDDOWN_UP = 13;
const FONT1 = ["45px serif",45];
const FONT2 = ["80px serif",80];
const FONT3 = ["100px serif",100];
const MAX_WALL = 15; //設置できる最大の壁数
const MAX_BALL = 10; //持てる最大のボールの数
const MAX_ENEMY = 10; //設置できる最大の敵数
const PC = 100;
const ANDROID = 1000;
const MAX_STAGE = 8;

var score = [0,0,0,0];
//var best_score = 100;
//var goal_distance = [0,30,20,20,20,20];
//var score_count = 1;  //何回目のスコアか
var ball_x = 180;
var ball_y = 200;
var ball_rad = 30; //半径
var hole_x = 0;
var hole_y = 0;
var hole_rad = 45; //半径
var border_arg = 0;
var wall_arg = [0];
var enemy_arg = [0];
var ball_arg = 90;
var reflect_x = 1;
var reflect_y = 1;
var hole_stop_flg = false;
var wall_crash_x_flg = [false];
var wall_crash_y_flg = [false];
var wall_crash_outrange_x_flg = [true];
var wall_crash_outrange_y_flg = [true];
var next_index_flg = false;
var next_stage_flg = false;
var speedup_botton_flg = false;
var speeddown_botton_flg = false;
var play_device = 0;
var select_device_flg = false;
var main_button_push_flg = false;
var enemy_emerge_flg = false; //敵が初登場したか
var warp_emerge_flg = false
var gravity_emerge_flg = false
var ball_count = MAX_BALL; // 残りのボールの数、残機

for (var i=0;i<MAX_WALL;i++){
    wall_crash_x_flg.push(false);
    wall_crash_y_flg.push(false);
    wall_crash_outrange_x_flg.push(true);
    wall_crash_outrange_y_flg.push(true);
    wall_arg.push(0);
}
for (var i = 0; i < MAX_ENEMY; i++){
    enemy_arg.push(0);
}

//ステージを設定する
function set_stage(stage){
    //create_wall(x,y,size,direction,category,spd,range,wall_number)
    //create_wall(,,,,,,,);
    //set_hole(x,y,direction,spd,range)
    //set_hole(,,,,);
    //set_enemy(x,y,rad,direction,spd,range,enemy_number)
    //set_enemy(,,,,,,);
    //set_warp(in_x,in_y,out_x,out_y,rad)
    //set_warp(,,,,);
    if (stage == 1){
        difficulty = 1
        bring_ball(490,1100,25);
        set_hole(490,200,STATIC,0,0);
        create_wall(20,650,1050,VERTICAL,STATIC,1,1,0);
        create_wall(960,650,1050,VERTICAL,STATIC,1,1,1);
        create_wall(490,125,940,PARALLEL,STATIC,0,0,2);
        create_wall(490,1175,940,PARALLEL,STATIC,0,0,3);

        create_wall(490,450,200,PARALLEL,LEFTRIGHT,0.12,300,4);
        create_wall(490,650,200,PARALLEL,LEFTRIGHT,0.08,300,5);
        create_wall(490,850,200,PARALLEL,LEFTRIGHT,0.05,300,6);
    }else if(stage == 2){
        difficulty = 2;
        bring_ball(490,1100,30);
        set_hole(80,670,STATIC,0,0);

        create_wall(20,650,1050,VERTICAL,STATIC,1,1,0);
        create_wall(900,650,300,VERTICAL,UPDOWN,0.07,250,1);
        create_wall(320,750,600,PARALLEL,STATIC,0,0,2);
        create_wall(520,125,500,PARALLEL,STATIC,0,0,3);
    }else if(stage == 3){
        difficulty = 3;
        bring_ball(490,1100,40);
        set_hole(490,500,STATIC,0,0);
        //outwall
        create_wall(20,650,1050,VERTICAL,STATIC,1,1,0);
        create_wall(960,650,1050,VERTICAL,STATIC,1,1,1);
        create_wall(490,125,940,PARALLEL,STATIC,0,0,2);
        create_wall(490,1175,940,PARALLEL,STATIC,0,0,3);
        //innerwall
        create_wall(490,320,150,PARALLEL,UPDOWN,-0.1,120,4);
        create_wall(490,680,150,PARALLEL,UPDOWN,0.1,120,5);
        create_wall(310,500,150,VERTICAL,LEFTRIGHT,-0.1,120,6);
        create_wall(670,500,150,VERTICAL,LEFTRIGHT,0.1,120,7);
    }else if(stage == 4){
        difficulty = 3;
        bring_ball(490,1000,50);
        set_hole(490,180,LEFTRIGHT,0.07,300);

        create_wall(490,910,200,PARALLEL,STATIC,0,0,0);

        create_wall(150,900,150,VERTICAL,STATIC,0,0,1);
        create_wall(830,730,150,VERTICAL,STATIC,0,0,2);
        create_wall(150,600,150,VERTICAL,STATIC,0,0,3);
        create_wall(830,450,150,VERTICAL,STATIC,0,0,4);
        create_wall(150,300,200,VERTICAL,STATIC,0,0,5);
        create_wall(830,200,150,VERTICAL,STATIC,0,0,6);
        if(timer % 100 > 49){
            create_wall(490,120,600,PARALLEL,STATIC,0,0,7);
        }
    }else if(stage == 5){
        difficulty = 5;
        bring_ball(490,1060,50);
        set_hole(490,150,ROTATE,0.05,300);

        set_enemy(490,820,70,STATIC,0,0,0);
        set_enemy(150,380,40,UPDOWN,0.07,200,1);
        set_enemy(830,380,40,UPDOWN,-0.04,200,2);
        set_enemy(200,380,35,LEFTRIGHT,0.04,120,3);
        set_enemy(800,380,35,LEFTRIGHT,-0.07,120,4);

        create_wall(20,650,1050,VERTICAL,STATIC,1,1,0);
        create_wall(960,650,1050,VERTICAL,STATIC,1,1,1);
        create_wall(490,125,940,PARALLEL,STATIC,0,0,2);
        create_wall(490,1175,940,PARALLEL,STATIC,0,0,3);
    }else if(stage == 6){
        difficulty = 6;
        bring_ball(100,1100,80);
        set_hole(900,260,STATIC,0,0);
        set_warp(900,1000,100,750,40);
        set_warp(900,650,100,310,40);

        set_enemy(490,925,25,LEFTRIGHT,0.04,200,0);
        set_enemy(490,1125,25,LEFTRIGHT,-0.045,200,1);
        set_enemy(490,640,40,ROTATE,0.06,150,2);
        set_enemy(490,640,40,ROTATE,-0.04,150,3);
        set_enemy(490,275,30,UPDOWN,0.07,120,4);

        create_wall(20,650,1050,VERTICAL,STATIC,1,1,0);
        create_wall(960,650,1050,VERTICAL,STATIC,1,1,1);
        create_wall(490,125,940,PARALLEL,STATIC,0,0,2);
        create_wall(490,1175,940,PARALLEL,STATIC,0,0,3);

        create_wall(490,425,936,PARALLEL,STATIC,0,0,4);
        create_wall(490,875,936,PARALLEL,STATIC,0,0,5);
    }else if(stage == 7){
        difficulty = 6;
        set_hole(490,530,STATIC,0,0);
        bring_ball(250,1100,80);

        set_gravity(495,1020,150);
        set_gravity(395,760,120);
        set_gravity(595,760,120);
        set_gravity(490,220,90);
        set_gravity(250,220,40);

        create_wall(20,650,1050,VERTICAL,STATIC,1,1,0);
        create_wall(960,650,1050,VERTICAL,STATIC,1,1,1);
        create_wall(490,125,940,PARALLEL,STATIC,0,0,2);
        create_wall(490,1175,940,PARALLEL,STATIC,0,0,3);
        var a = 0;
        for (var i=0; i < 2; i++){
            for (var j=0; j < 3; j++){
                create_wall(255+490*i,360+270*j,200,PARALLEL,STATIC,0,0,4+a);
                a++;
            }
        }
    }else if(stage == 8){
        difficulty = 10
        set_hole(700,1100,STATIC,0,0);
        bring_ball(120,1100,95);

        create_wall(20,650,1050,VERTICAL,STATIC,1,1,0);
        create_wall(960,650,1050,VERTICAL,STATIC,1,1,1);
        create_wall(490,125,940,PARALLEL,STATIC,0,0,2);
        create_wall(490,1175,940,PARALLEL,STATIC,0,0,3);

        create_wall(220,975,400,VERTICAL,STATIC,0,0,4);
        create_wall(590,975,734,PARALLEL,STATIC,0,0,5);
        create_wall(350,550,846,VERTICAL,STATIC,0,0,6);
        create_wall(550,1075,200,VERTICAL,STATIC,0,0,7);
        if (timer % 100 <= 50){
            create_wall(185,300,324,PARALLEL,STATIC,0,0,8);
        }
        set_gravity(185,210,70);
        set_gravity(650,300,70);
        set_gravity(550,700,10+(timer%80));

        set_warp(285,910,410,190,40);
        set_warp(800,800,900,1100,40);
        set_warp(590,500,900,200,40);
        set_warp(840,370,420,900,40);
        set_warp(660,180,380,1080,40);

        set_enemy(770,600,5 + (timer%120),STATIC,0,0,0);
        set_enemy(700,910,30,LEFTRIGHT,0.03,200,1);
    }
}

//ボールの初期座標を決める
function bring_ball(x,y,spd){
    if (timer == 1){
        ball_x = x;
        ball_y = y;
        base_speed = spd;
    }
}

//base_speed の初期化
function new_paramater(new_stage){
    base_speed = 25; 
    speed_x = 0;
    speed_y = 0;
    border_arg = 0;
    for(var i=0; i<MAX_WALL; i++){
        wall_arg[i] = 0;
    }
    if (new_stage) {
        ball_arg = 90;
    }
    reflect_x = 1;
    reflect_y = 1;
    //hole_stop_flg = false;
}

//ボタンを押してスピードを変える
function change_speed(setspeed){
    if(index == 3 && start_flg == false){
        if(setspeed == UP){
            base_speed += 1;
        }else if(setspeed == DOWN){
            base_speed -= 1;
        }
    }
    if (base_speed > 95) base_speed = 95;
}

function select_device(device){
    if(index == 0){
        play_device = device;
        select_device_flg = true;
    }
}


function add_speed(){
    if (speedup_botton_flg){
            base_speed += 0.2;
        }else if (speeddown_botton_flg){
            base_speed -= 0.2;
            if (base_speed < 0){
                base_speed = 0;
            }
        }
}
    

//ボールを動かすフラグを立てる
//次へでindexを加算
function start_ball(){
    if (index == 3){
        start_flg = true;
    }else if(index < 6){
        if(index == 2 && stage_number == 5){
            index = 7;
        }else if(index == 2 && stage_number == 6){
            index = 8
        }else if(index == 2 && stage_number == 7){
            index = 9
        }else{
            index ++;
            timer = 0;
        }
        
    }else if (index != 6){
        index = 3;
        timer = 0;
    }else{
        index = 0;
        timer = 0;
    }
}

//ボールの発射方向を変える
function change_ball_direction(direction){
    if(index == 3 && start_flg == false){
        if (direction == LEFT){
            ball_arg += 5;
            if (ball_arg > 180){
                ball_arg = 180;
            }
        }else if (direction == RIGHT){
            ball_arg -= 5;
            if (ball_arg < 0){
                ball_arg = 0;
            }
        }
    }
}

//ボールを加速して動かす
function move_ball(){
    if (index == 3){
        if (start_flg){
            speed_x = base_speed * Math.cos(Math.PI*ball_arg/180);
            speed_y = base_speed * Math.sin(Math.PI*ball_arg/180);
            for(var i=0;i<MAX_WALL;i++){
                if (wall_crash_x_flg[i]){
                    reflect_x *= -1;
                    wall_crash_x_flg[i] = false;
                }
                if (wall_crash_y_flg[i]){
                    reflect_y *= -1;
                    wall_crash_y_flg[i] = false;
                    //alert(i);
                }
            }
            ball_x += speed_x*reflect_x;
            ball_y -= speed_y*reflect_y;
            base_speed *= acceleration - acceleration_down*0.00001;
            if (base_speed < 0.3 || fall_flg || ball_x < -10 || ball_x > 1000 || ball_y < -10 || ball_y > 1200){
                base_speed = 0;
                acceleration_down = 0;
                start_flg = false;
                //hole_stop_flg = true;
                ball_count--;
                index ++;
            }else{
                acceleration_down++;
            }
        }
    }
    //ボールを描く
    if (ball_y >= 50 && !fall_flg){
        context.fillStyle = 'rgb(0,0,255)';
        context.beginPath();
        context.arc(ball_x,ball_y,ball_rad,0,Math.PI*2,true);
        context.fill();
    }
}

//holeを設置する 
function set_hole(x,y,direction,spd,range){     //spd = border_speed
    /*
    if (hole_stop_flg == false){
        border_arg += spd;
    }else{
        //スコア計算
        score[score_count] = check_direction(ball_x,ball_y,x+range*Math.cos(border_arg),y+range*Math.sin(border_arg))/5;
    }
    */
    border_arg += spd;

    if (direction == LEFTRIGHT){
        x += range*Math.cos(border_arg);
    }else if (direction == UPDOWN){
        y += range*Math.sin(border_arg);
    }else if(direction == ROTATE){
        x += range*Math.cos(border_arg);
        y += range*Math.sin(border_arg);
    }

    // ボールがホールに落ちた(触れた)かを判定する
    if(check_direction(ball_x, ball_y, x, y) <= hole_rad){
        fall_flg = true;
        index = 4;
    }

    // ホールを描画する
    context.fillStyle = 'rgb(0,0,0)';
    context.beginPath();
    context.arc(x,y,hole_rad,0,Math.PI*2,true);
    context.closePath();
    context.fill();
}

//壁を設置して動かす
function create_wall(x,y,size,direction,category,spd,range,wall_number){  
    if (category == LEFTRIGHT || category == UPDOWN){
        wall_arg[wall_number] += spd;
    }
    if (category == LEFTRIGHT){
        x += range*Math.sin(wall_arg[wall_number]);
    }else if (category == UPDOWN){
        y += range*Math.sin(wall_arg[wall_number]);
    }
    
        //壁とボールの当たり判定
        if (direction == PARALLEL){
            if (ball_x >= x-size/2 && ball_x <= x+size/2){
                if (ball_y < y+ball_rad+2 && ball_y > y-ball_rad-2){
                    if(wall_crash_outrange_y_flg[wall_number]){
                        wall_crash_y_flg[wall_number] = true;
                        wall_crash_outrange_y_flg[wall_number] = false;
                    }
                }else{
                    wall_crash_y_flg[wall_number] = false;
                }
            }
            if(check_direction(ball_x,ball_y,x,y) > 50){
                 wall_crash_outrange_y_flg[wall_number] = true;
            }
        }else if (direction == VERTICAL){
            if (ball_y >= y-size/2 && ball_y <= y+size/2){
                if (ball_x < x+ball_rad+2 && ball_x > x-ball_rad-2){ 
                      if(wall_crash_outrange_x_flg[wall_number]){
                        wall_crash_x_flg[wall_number] = true;
                        wall_crash_outrange_x_flg[wall_number] = false;
                      }
                }else{
                    wall_crash_x_flg[wall_number] = false;
                    wall_crash_outrange_x_flg[wall_number] = true;
                }
            }
            if(check_direction(ball_x,ball_y,x,y) > 50){
                 wall_crash_outrange_x_flg[wall_number] = true;
            }
        }

        //壁を描く
        context.fillStyle = 'rgb(255,255,20)';
        context.beginPath();
        if (direction == PARALLEL){
            context.moveTo(x-size/2,y-2);
            context.lineTo(x+size/2,y-2);
            context.lineTo(x+size/2,y+2);
            context.lineTo(x-size/2,y+2);
        }else if(direction == VERTICAL){
            context.moveTo(x-2,y-size/2);
            context.lineTo(x-2,y+size/2);
            context.lineTo(x+2,y+size/2);
            context.lineTo(x+2,y-size/2);
        }
        context.closePath();
        context.fill();


}

//敵を設置する
function set_enemy(x,y,rad,direction,spd,range,enemy_number)
{
    if (direction == LEFTRIGHT){
        x += range*Math.sin(enemy_arg[enemy_number]);
    }else if (direction == UPDOWN){
        y += range*Math.sin(enemy_arg[enemy_number]);
    }else if(direction == ROTATE){
        x += range*Math.cos(enemy_arg[enemy_number]);
        y += range*Math.sin(enemy_arg[enemy_number]);
    }
    enemy_arg[enemy_number] += spd;

    //敵とボールの当たり判定
    if (check_direction(ball_x,ball_y,x,y) < rad && index == 3){
        base_speed = 0;
        acceleration_down = 0;
        start_flg = false;
        ball_count--;
        index ++;
    }

    //敵を描画する
    context.fillStyle = 'rgb(255,0,0)';
    context.beginPath();
    context.arc(x,y,rad,0,Math.PI*2,true);
    context.closePath();
    context.fill();
}

//ワープを設置する
function set_warp(in_x,in_y,out_x,out_y,rad)
{
    if (check_direction(ball_x,ball_y,in_x,in_y) < rad) {
        ball_x = out_x;
        ball_y = out_y;
    }

    context.fillStyle = 'rgb(150,0,150)';
    context.beginPath();
    context.arc(in_x,in_y,rad,0,Math.PI*2,true);
    context.closePath();
    context.fill();

    context.fillStyle = 'rgb(100,0,100)';
    context.beginPath();
    context.arc(out_x,out_y,rad,0,Math.PI*2,true);
    context.closePath();
    context.fill();

    spiral(in_x,in_y,rad,'rgb(0,0,0)',2);
    spiral(out_x,out_y,rad,'rgb(0,0,0)',2);
}

function spiral(x,y,rad,color,circle_amount){

    for (var i=1; i <= circle_amount; i++){
        if (circle_amount != 0){
            context.strokeStyle = color;
            context.beginPath();
            context.arc(x,y,rad-(timer+rad*(1/i))%rad,0,Math.PI*2,true);
            context.closePath();
            context.stroke();
        }
    }
}

function set_gravity(x,y,rad){

    if (check_direction(x,y,ball_x,ball_y) < rad){
        base_speed -= 6; //減速率
    }

    var black_gradation = ['rgb(100,100,100)', 'rgb(90,90,90)', 'rgb(80,80,80)', 'rgb(70,70,70)', 'rgb(60,60,60)', 'rgb(50,50,50)', 'rgb(40,40,40)', 'rgb(30,30,30)', 'rgb(20,20,20)', 'rgb(10,10,10)']
    for (var i = 0; i < 10; i++){
        context.fillStyle = black_gradation[i];
        context.beginPath();
        context.arc(x,y,rad*(1-i/10),0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }
}

//画面を描く    枠線    
function draw_screen(){
    //スコア画面 白の部分
    context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(0,0,980,100);

    context.fillStyle = 'rgb(0,0,0)';
    context.font = "50px serif";
    context.fillText("残りボール数：" + ball_count,20,70);


    //スピードメーターの表示
    //外枠
    context.strokeStyle = 'rgb(255,0,150)';
    context.strokeRect(10,1190,950,100);

    //内側の背景
    context.fillStyle = 'rgb(0,100,200)';
    context.fillRect(11,1191,948,98);

    context.fillStyle = 'yellow';
    context.beginPath();
    context.moveTo(11,1191);
    context.lineTo(11,1289);
    context.lineTo(11+Math.sqrt(base_speed*base_speed)*10,1289);
    context.lineTo(11+Math.sqrt(base_speed*base_speed)*10,1191);
    context.fill();

    //ボールの進行方向を表示
    if (index == 3){
        if (start_flg == false){
            context.strokeStyle = 'rgb(0,200,0)';
            context.beginPath();
            context.moveTo(ball_x,ball_y);
            var x =  (200*Math.cos(-1*Math.PI*ball_arg/180) + ball_x); 
            var y =  (200*Math.sin(-1*Math.PI*ball_arg/180) + ball_y);
            context.lineTo(x,y);
            context.closePath();
            context.stroke();

            context.fillStyle = 'rgb(0,200,0)';
            context.beginPath();
            context.moveTo(x,y);
            context.lineTo(200*Math.cos(-1*Math.PI*(ball_arg+10)/180) + ball_x,150*Math.sin(-1*Math.PI*(ball_arg+16)/180) + ball_y);
            context.lineTo(200*Math.cos(-1*Math.PI*(ball_arg-10)/180) + ball_x,150*Math.sin(-1*Math.PI*(ball_arg-16)/180) + ball_y);
            context.fill();
        }
    }
    
}

function draw_text(text,fnt,font_size,x,y,width,height,color){
    //背景
    context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(x-width/2,y-height/2,width,height);

    //外枠
    context.strokeStyle = 'rgb(0,0,0)';
    context.strokeRect(x-width/2,y-height/2,width,height);

    //text
    context.fillStyle = color;
    context.font = fnt;
    for (var i=0; i < text.length; i++){
        context.fillText(text[i],x-text[i].length*font_size/2.3,y-text.length*22+font_size*2*i);
    }
}

//２点間の距離を求める
function check_direction(x1,y1,x2,y2){
    return(Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2)));
}


function main(){
    var canvas = document.getElementById("game");
    context = canvas.getContext("2d");

    context.clearRect(0,0,canvas.width,canvas.height);
    timer ++;

    if (index == 0){
        document.getElementById("start").innerHTML = "スタート";
    }else if (index == 3){
        document.getElementById("start").innerHTML = "発射";
    }else if(index == 6){
        document.getElementById("start").innerHTML = "タイトルへ";
    }else{
        document.getElementById("start").innerHTML = "次へ";
    }

    if (index == 0){ 
        var text = ["転がるボール、 ","君に朝が降る "];
        draw_text(text,FONT3[0],FONT3[1],490,650,900,700,"green");
        timer = 0;
        stage_number = 1;
        ball_count = MAX_BALL;
        new_paramater(true);
    }else if(index == 1){  
        //ルール説明
        set_stage(stage_number);
        var text = ["<>ルール<>",
                    "黒い穴にボールを入れる",
                    "UP/DOWNボタンでボールの速度を変える",
                    "左/右ボタンでボールの角度を変える"];
        draw_text(text,FONT1[0],FONT1[1],490,650,900,700,"black");
    }else if(index == 2){
        //next_stage_flg = false;
        set_stage(stage_number);
        var text = ["ステージ : "+stage_number,
                    "難易度 : " + difficulty]
        draw_text(text,FONT2[0],FONT2[1],490,650,900,700,"black");
        start_flg = false;
        move_ball();
    }else if(index == 3){
        //プレーヤーの操作
        set_stage(stage_number);
        move_ball();
        add_speed();
    }else if(index == 4){
        // set_stage(stage_number);
    
        if(fall_flg){
            index++;
            fall_flg = false;
        }else if(ball_count != 0){
            index = 3;
            timer = 0;
        }else{
            alert("残念！！　すべてのボールを使ってしまった！！" + "\n" + "またの挑戦を待っているぞ！！");
            index = 0;
        }
        new_paramater(false);
    }else if(index == 5){
        if(stage_number < MAX_STAGE){
            stage_number ++;
            index = 2;
            ball_count = MAX_BALL;
            timer = 0;
            alert("ステージクリアおめでとう！　次のステージへ");
        }else{
            index = 6;
            timer = 0;
        }
        new_paramater(true);
    }else if(index == 6){
        move_ball();
        set_stage(stage_number);
        var text = ["　　　　CONGRATULATION！！",//!!CONGRATULATION!!
                    "全ステージクリア"]
        draw_text(text,FONT2[0],FONT2[1],490,650,900,700,"red");
    }else if(index == 7){
        set_stage(stage_number);
        move_ball();
        var text = ["赤い穴を避けよう！"]
        draw_text(text,FONT2[0],FONT2[1],490,650,900,700,"red");
        enemy_emerge_flg = false;
    }else if(index == 8){
        set_stage(stage_number);
        var text = ["紫の穴に入ると", "ボールがワープするぞ！"]
        draw_text(text,FONT2[0],FONT2[1],490,650,900,700,"purple");
        warp_emerge_flg = false
    }else if(index == 9){
        set_stage(stage_number);
        var text = ["黒いエリアは", "重力が強くて", "ボールが遅くなるぞ！"]
        draw_text(text,FONT2[0],FONT2[1],490,650,900,700,"black");
        gravity_emerge_flg = false
    }

    draw_screen();
}

setInterval('main()' ,16);
