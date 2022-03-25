
function evaluateExpression(expr) 
//Recursive descent parser
{
	let pos = 0;
	function peek()
	{
		while (pos < expr.length && expr[pos] == ' ')
			pos++
		return expr[pos];
	};

	function get()
	{
		while (pos < expr.length && expr[pos] == ' ')
			pos++
		return expr[pos++];
	};

	function getNumber()
	{
		let isSign;
		if (peek() == '-') {
			isSign = true;
			get();
		}
		else isSign = false; 

		let result = get() - '0';
		while (peek() >= '0' && peek() <= '9')
			result = 10*result + (get() - '0');
		if (peek() == '.') {
			get(); // '.'
			let decpart = 0;
			let cnt = 1
			while (peek() >= '0' && peek() <= '9') {
				cnt = cnt * 10;
				decpart = 10*decpart + (get() - '0');
			}
			result = result + (decpart/cnt);
		}
		if (isSign)
			result = -result;
		return result;
	}

	function factor()
	{
		if (peek() >= '0' && peek() <= '9')
			return getNumber();
		else if (peek() == '(') {
			get(); // '('
			let result = expression();
			if (get() != ')')
				return NaN;
			else return result;
		}
		else if (peek() == '-') {
			get();
			return -factor();
		}
		else if (peek() == '+') {
			get();
			return factor();
		}
		return NaN; // error
	}

	function term()
	{
		let result = factor();
		while (peek() == '*' || peek() == '/')
			if (get() == '*')
				result *= factor();
			else {
				let ndiv = factor();
				result = ndiv ? result/ndiv : NaN;
			}
		return result;
	}

	function expression()
	{
		let result = term();
		while (peek() == '+' || peek() == '-')
			if (get() == '+')
				result += term();
			else result -= term();
		return result;
	}

	return expression();
};
