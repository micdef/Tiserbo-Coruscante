<?php

	$to = "micdef@hotmail.com";
	$subject = "test-hmailserver-php";
	$headers = "MIME-Version: 1.0 \n";
	$headers .= "Content-type: text/html; charset=iso-8859-1 \n";
	$body = "<html>
				<head>
					<title>Test hMailServer PHP</title>
			 	</head>
			 	<body>
					<p>TEST</p>
			 	</body>
			 </html>";
	mail($to, $subject, $body, $headers);

?>