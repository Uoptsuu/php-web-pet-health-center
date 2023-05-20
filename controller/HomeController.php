<?php
// include "config/lib/PHPMailer/mailer/PHPMailer.php";
// include "config/lib/PHPMailer/mailer/Exception.php";
// include "config/lib/PHPMailer/mailer/OAuth.php";
// include "config/lib/PHPMailer/mailer/POP3.php";
// include "config/lib/PHPMailer/mailer/SMTP.php";

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

class HomeController extends BaseController
{

    public function index()
    {
        $this->render_view(
            'index'
        );
    }

    public function index_admin()
    {
        $this->render_view_role(
            'index',
            'admin'
        );
    }

    public function error_page()
    {
        if (isset($_GET['error']) && $_GET['error'] != null && $_GET['error'] != '') {
            $this->render_error($_GET['error']);
        } else $this->render_error('404');
    }

    public function login_page()
    {
        if (isset($_SESSION['login']) && $_SESSION['login']) {
            $this->redirect('home', 'index');
        } else {
            $this->render_view('login');
        }
    }

    public function logout()
    {
        $_SESSION['login'] = null;
        $this->response('01', 'Success', null);
    }

    public function login_action()
    {
        $responseCode = ResponseCode::FAIL;
        $message = sprintf(ResponseMessage::UNKNOWN_ERROR_MESSAGE, "");
        $data[] = null;
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $requestLogin = $_POST;
            //var_dump($requestLogin);
            if ($requestLogin['lgUsername'] != '' && $requestLogin['lgPassword'] != '') {
                $adminModel = $this->get_model('admin');
                $admin = $adminModel->get_by_username(htmlspecialchars($requestLogin['lgUsername']));
                // , htmlspecialchars($requestLogin['lgPassword'])
                if ($admin == null) {
                    $customerModel = $this->get_model('customer');
                    $customer = $customerModel->get_by_phone(htmlspecialchars($requestLogin['lgUsername']),1);
                    // , htmlspecialchars($requestLogin['lgPassword'])
                    if ($customer == null) {
                        $responseCode = ResponseCode::DATA_DOES_NOT_MATCH;
                        $message = sprintf(ResponseMessage::OBJECT_DOES_NOT_EXIST_MESSAGE, "Người dùng");
                    } else {
                        if ($customer['ctm_password'] == md5($requestLogin['lgPassword'])) {
                            $_SESSION['login'] = true;
                            $token = $this->generate_token($customer['ctm_id'], 'customer', -1);
                            $responseCode = ResponseCode::SUCCESS;
                            $message = ResponseMessage::SUCCESS_MESSAGE;
                            $data = [
                                "token" => $token,
                                "typeAccount" => "customer",
                            ];
                        } else {
                            $responseCode = ResponseCode::DATA_DOES_NOT_MATCH;
                            $message = sprintf(ResponseMessage::DATA_DOES_NOT_MATCH_MESSAGE, "mật khẩu");
                        }
                    }
                } else {
                    if (md5($requestLogin['lgPassword']) == $admin['ad_password']) {
                        $_SESSION['login'] = true;
                        $token = $this->generate_token($admin['ad_id'], 'admin', $admin['ad_role']);
                        $responseCode = ResponseCode::SUCCESS;
                        $message = ResponseMessage::SUCCESS_MESSAGE;
                        $data = [
                            "token" => $token,
                            "typeAccount" => "admin",
                        ];
                    } else {
                        $responseCode = ResponseCode::DATA_DOES_NOT_MATCH;
                        $message = sprintf(ResponseMessage::DATA_DOES_NOT_MATCH_MESSAGE, "mật khẩu");
                    }
                }
            } else {
                $responseCode = ResponseCode::INPUT_EMPTY;
                $message = sprintf(ResponseMessage::INPUT_EMPTY_MESSAGE, "người dùng");
            }
        } else {
            $responseCode = ResponseCode::REQUEST_INVALID;
            $message = sprintf(ResponseMessage::REQUEST_INVALID_MESSAGE);
        }
        $this->response($responseCode, $message, $data);
    }

    // public function send_mail()
    // {
    //     $mail = new PHPMailer(true);                             
    //     try {
    //         //Server settings
    //         $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    //         $mail->isSMTP();                                      // Set mailer to use SMTP
    //         $mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
    //         $mail->SMTPAuth = true;                               // Enable SMTP authentication
    //         $mail->Username = 'gocithuce@gmail.com';                 // SMTP username
    //         $mail->Password = 'crmfnxbzieqovspz';                 // SMTP password
    //         $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    //         $mail->Port = 587;                                    // TCP port to connect to

    //         //Recipients
    //         $mail->setFrom('from@example.com', 'Mailer');
    //         $mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
    //         $mail->addAddress('ellen@example.com');               // Name is optional
    //         $mail->addReplyTo('info@example.com', 'Information');
    //         $mail->addCC('cc@example.com');
    //         $mail->addBCC('bcc@example.com');

    //         //Attachments
    //         $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //         $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //         //Content
    //         $mail->isHTML(true);                                  // Set email format to HTML
    //         $mail->Subject = 'Here is the subject';
    //         $mail->Body    = 'This is the HTML message body in bold!';
    //         $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    //         $mail->send();
    //         echo 'Message has been sent';
    //     } catch (Exception $e) {
    //         echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    //     }
    // }
}
