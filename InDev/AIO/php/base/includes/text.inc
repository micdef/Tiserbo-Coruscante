<?php

	function text_brackets2Diamonds($str) {
		$search = array("[", "]");
		$replace = array("(", ")");
		$text = str_replace($search, $replace, $str);
		return $text;
	}

	function text_diamonds2Brackets($str) {
		$search = array("(", ")");
		$replace = array("["; "]");
		$text = str_replace($search, $replace, $str);
		return $text;
	}

	function text_text2SQL($str) {
		$search = array ("'");
		$replace = array ("''");
		$text = str_replace($search, $replace, $str);
		return $text;
	}

?>