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
      <p><strong>รีเซ็ตรหัสผ่านเสร็จสิ้น</strong></p>
      <p class="content">รหัสผ่านของคุณ {{$name_first}} ถูกรีเซ็ตเรียบร้อย !</p>
      <p class="content">
        เพื่อการตั้งรหัสผ่านใหม่ที่คุณต้องการ โปรดเข้าสู่ระบบผ่านลิ้งค์ <a href="{{ $link }}">{{$link}}</a> โดยใช้รหัสผ่านชั่วคราวของเราในการเข้าสู่ระบบ
      </p>
      <p class="content">รหัสผ่านชั่วคราวของคุณคือ {{$password}}</p>
      <p class="content">
        เมื่อเข้าสู่ระบบเรียบร้อย คุณ {{$name_first}} สามารถเปลี่ยนรหัสผ่านให้เป็นตามที่คุณต้องการได้ผ่านทางหน้า
        ข้อมูลส่วนตัวในเมนู “สวัสดี, คุณ {{$name_first}} {{$name_last}}
      </p>
      <p class="content">
        หากคุณ {{$name_first}} พบปัญหาหรือมีข้อสงสัยอย่างไร สามารถสอบถามได้ที่ <a href="https://www.facebook.com/chevdiet">Facebook Fanpage</a> หรือทาง Email : <a href="order@chev-diet.com">order@chev-diet.com</a>
      </p>
      <p class="content">
        ขอบคุณทุกความเชื่อมั่นและความไว้ใจที่มีให้เรา<br>
        CHEV DIETARY SUPPLEMENT
      </p>
      <div>_________________________________________________________________________________________________________________</div>
      <p style="line-height: 2; font-size: 8px;" class="content">CHEV DIETARY SUPPLEMENT</p>
    </div>
  </body>
</html>
