<?php
if($_POST)
{
require('constant.php');
    
    $user_name      = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $content   = filter_var($_POST["content"], FILTER_SANITIZE_STRING);
    
    if(empty($user_name)) {
		$empty[] = "<b>Pole Imię i Nazwisko</b>";		
	}
	if(empty($user_email)) {
		$empty[] = "<b>Pole E-mail</b>";
	}
	if(empty($content)) {
		$empty[] = "<b>Pole Wiaomość</b>";
	}
	
	if(!empty($empty)) {
		$output = json_encode(array('type'=>'error', 'text' => implode(", ",$empty) . ' wymagane!'));
        die($output);
	}
	
	if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
	    $output = json_encode(array('type'=>'error', 'text' => '<b>'.$user_email.'</b> jest nieodpowiednim adresem email. Sprawdź jego poprawność i wpisz adres ponownie.'));
		die($output);
	}
	
	//reCAPTCHA validation
	if (isset($_POST['g-recaptcha-response'])) {
		
		require('../component/recaptcha/src/autoload.php');		
		
		$recaptcha = new \ReCaptcha\ReCaptcha(SECRET_KEY, new \ReCaptcha\RequestMethod\SocketPost());

		$resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

		  if (!$resp->isSuccess()) {
				$output = json_encode(array('type'=>'error', 'text' => 'Wymagane wypełnienie! <b>Captcha</b>'));
				die($output);				
		  }	
	}
	
	$toEmail = "contact@ernestdolowy.pl,erndolowy@gmail.com";
	$mailHeaders = "From: " . $user_name . "<" . $user_email . ">\r\n";
	if (mail($toEmail, "Contact Mail", $content, $mailHeaders)) {
	    $output = json_encode(array('type'=>'message', 'text' => 'Cześć '.$user_name .', dzięki za wiadomość. Odpowiem jak tylko będę mógł. Pozdrawiam.'));
	    die($output);
	} else {
	    $output = json_encode(array('type'=>'error', 'text' => 'Nie można wysłać maila, spróbuj ponownie później.'.SENDER_EMAIL));
	    die($output);
	}
}
?>