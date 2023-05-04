<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="shortcut icon" type="image/png" href="asset/img/icon_web.png" />
  <title>Đăng nhập | CarePET</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
  <link rel="stylesheet" href="asset/css/login.css">
</head>

<body>
  <div class="container">
    <div class="forms">
      <div class="form login">
        <span class="title">Đăng nhập</span>
        <form action="?controller=home&action=login_action" method=post>
          <div class="input-field">
            <input type="text" placeholder=" " class="form-input" name="phone">
            <label for="" class="form-active" style="font-size:15px; color: #ED6436;">&nbspSố điện thoại</label>
            <i class="uil uil-phone icon"></i>
          </div>
          <div class="input-field">
            <input type="password" class="form-input password" placeholder=" " name="password">
            <label for="" class="form-active" style="font-size:15px; color: #ED6436;">&nbspMật khẩu</label>
            <i class="uil uil-lock icon"></i>
            <i class="uil uil-eye-slash showHidePw"></i>
          </div>
          <div class="checkbox-text">
            <div class="checkbox-content">
              <input style="color: #ED6436;" type="checkbox" id="logCheck">
              <p for="logCheck" class="text">Ghi nhớ đăng nhập</p>
            </div>
            <a href="#" class="text">Quên mật khẩu?</a>
          </div>
          <div class="input-field button">
            <input type="submit" value="Đăng nhập">
          </div>
        </form>
        <div class="login-signup">
          <span class="text" style="font-size:15px">Bạn chưa có tài khoản?
            <a href="#" class="text signup-link">Đăng ký ngay</a>
          </span>
        </div>
        <?php if (isset($_SESSION['msg_login']) && isset($_SESSION['check_login']) && !$_SESSION['check_login']): ?>
        <div class="login-signup">
          <span class="text" style="font-size:15px; color: red; font-weight:600"><?php echo $_SESSION['msg_login']?></span>
        </div>
        <?php endif;
          $_SESSION['msg_login'] = null;
          $_SESSION['check_login'] = null;
        ?>
      </div>

      <div class="form signup">
        <span class="title">Đăng ký</span>
        <form action="#">
          <div class="input-field">
            <input type="text" placeholder=" " required class="form-input ">
            <label class="form-active" for="" style="font-size:15px; color: #ED6436;">&nbspHọ và tên</label>
            <i class="uil uil-user"></i>
          </div>
          <div class="input-field">
            <input type="text" placeholder=" " required class="form-input ">
            <label class="form-active" for="" style="font-size:15px; color: #ED6436;">&nbspEmail</label>
            <i class="uil uil-envelope icon"></i>
          </div>
          <div class="input-field">
            <input type="text" placeholder=" " required class="form-input ">
            <label class="form-active" for="" style="font-size:15px; color: #ED6436;">&nbspSố điện thoại</label>
            <i class="uil uil-phone"></i>
          </div>
          <div class="input-field">
            <input type="text" placeholder=" " required class="form-input ">
            <label class="form-active" for="" style="font-size:15px; color: #ED6436;">&nbspĐịa chỉ</label>
            <i class="uil uil-location-pin-alt"></i>
          </div>
          <div class="input-field">
            <input type="text" placeholder=" " required class="form-input password">
            <label class="form-active" for="" style="font-size:15px; color: #ED6436;">&nbspMật khẩu</label>
            <i class="uil uil-lock icon"></i>
            <i class="uil uil-eye-slash showHidePw"></i>
          </div>
          <div class="input-field">
            <input type="text" placeholder=" " required class="form-input password">
            <label class="form-active" for="" style="font-size:15px; color: #ED6436;">&nbspXác nhận mật khẩu</label>
            <i class="uil uil-lock icon"></i>
            <i class="uil uil-eye-slash showHidePw"></i>
          </div>
          <div class="Gender">
            <h4 class="mb-2 pb-1">Giới tính: </h4>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender" value="option1" checked />
              <label class="form-check-label" for="maleGender">Nam</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender" value="option2" />
              <label class="form-check-label" for="femaleGender">Nữ</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender" value="option3" />
              <label class="form-check-label" for="otherGender">Khác</label>
            </div>
          </div>
          <div class="input-field button">
            <input type="submit" value="Đăng ký">
          </div>
        </form>
        <div class="login-signup">
          <span class="text" style="font-size:15px">Bạn đã có tài khoản?
            <a href="#" class="text login-link">Đăng nhập ngay</a>
          </span>
        </div>
      </div>
    </div>
  </div>

  <script src="asset/js/login.js"></script>

</body>

</html>