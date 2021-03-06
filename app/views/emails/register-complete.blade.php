<!DOCTYPE html>
<html lang="th">
  <head>
    <meta charset="utf-8">
    <style type="text/css">
      .box {
        width: 600px;
        margin: 60px auto;
        position: relative;
      }
      .line {
        width: 100%;
        height: 1px;
        background-color: rgba(0,0,0,0.15);
      }
      .line.top {
        margin: 15px 0 30px;
      }
      .line.bottom {
        margin: 30px 0 10px;
      }
      .logo {
        padding-left: 10px;
        padding-right: 20px;
      }
      .inline {
        display: inline-block;
      }
      .content {
        font-size: 0.8rem;
        padding-left: 10px;
        color: rgba(0,0,0,0.9);
        line-height: 1.6;
      }
      .sp-logo {
        padding-left: 10px;
        padding-right: 20px;
        float: right;
      }
    </style>
  </head>
  <body>
    <div class="box"><a href="http://www.chev-diet.com"><img src="http://www.chev-diet.com/public/img/logo_email.png" width="131" class="logo inline"></a>
      <p class><strong>สมัครสมาชิกเสร็จสิ้น</strong></p>
      <p class="content">
        ยินดีต้อนรับคุณ {{$name_first}} {{$name_last}} !<br>
        เราเป็นเกียรติอย่างยิ่งที่คุณได้เข้าร่วมเป็นส่วนหนึ่งของพวกเรา
      </p>
      <p class="content">คุณ {{$name_first}} สามารถลงชื่อเข้าใช้งานได้ <a href="http://www.chev-diet.com/login">ที่นี่</a></p>
      <p class="content">
        หากคุณ {{$name_first}} พบปัญหาหรือมีข้อสงสัยอย่างไร สามารถสอบถามได้ที่ <a href="https://www.facebook.com/chevdiet">Facebook Fanpage</a> หรือทาง Email : <a href="mailto:order@chev-diet.com">order@chev-diet.com</a>
      </p>
      <p class="content">
        ขอบคุณทุกความเชื่อมั่นและความไว้ใจที่มีให้เรา<br>
        CHEV
      </p>
      <div>_________________________________________________________________________________________________________________</div>
      <p style="line-height: 2; font-size: 8px;" class="content">CHEV DIETARY SUPPLEMENT</p>
    </div>
  </body>
</html>
