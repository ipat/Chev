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
      .head-fix {
        padding: 0;
        margin: 0;
        line-height: -20px;
        position: absolute;
        top: 6px;
        left: 145px;
        color: rgba(0,0,0,0.6);
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
    <div class="box"><a href="http://www.chev-diet.com"><img src="http://www.chev-diet.com/public/img/logo2.png" width="125" class="logo inline"></a>
      <p class="head-fix"><strong>จัดส่งสินค้าเรียบร้อย !</strong></p>
      <div class="line top"></div>
      <p class="content">เลขพัสดุ EMS ของออเดอร์คือ <strong>{{$tracking_code}}</strong></p>
      <p class="content">สินค้าจะถึงประมาณวันที่ <strong>{{$arrival_date}}</strong></p>
      <p class="content">เราเป็นเกียรติอย่างยิ่งที่คุณ {{$name_first}} {{$name_last}} ได้มอบโอกาศให้เราได้ดูแลสุขภาพผิวของคุณ</p>
       <p class="content">
        หากคุณ {{$name_first}} พบปัญหาหรือมีข้อสงสัยอย่างไร สามารถสอบถามได้ที่ <a href="https://www.facebook.com/kenestore">Facebook Fanpage</a> หรือทาง Email : <a href="mailto:wattanai.chev@gmail.com">wattanai.chev@gmail.com</a>
      </p>
      <p class="content">
        ขอบคุณทุกความเชื่อมั่นและความไว้ใจที่มีให้เรา<br>
        CHEV
      </p>
      <p style="line-height: 2; font-size: 8px;" class="content">CHEV DIETARY SUPPLEMENT</p>
    </div>
  </body>
</html>
