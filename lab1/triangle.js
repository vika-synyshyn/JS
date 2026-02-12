console.log(`Функція triangle розв'язує прямокутний трикутник.
Знаходить усі сторони (a, b, c) та обидва гострі кути (alpha, beta) за двома заданими елементами.

Виклик:
triangle(значення1, тип1, значення2, тип2)

Можливі типи:
leg — катет
hypotenuse — гіпотенуза
adjacent angle — прилеглий до заданого катета кут
opposite angle — протилежний до заданого катета кут
angle — один з гострих кутів (коли задана гіпотенуза)

Приклади:
triangle(4, "leg", 8, "hypotenuse")
triangle(8, "hypotenuse", 4, "leg")
triangle(3, "leg", 4, "leg")
triangle(10, "hypotenuse", 30, "angle")
triangle(5, "leg", 30, "adjacent angle")
triangle(5, "leg", 30, "opposite angle")`);

function triangle(value1, type1, value2, type2) {
  const types = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

  if (!types.includes(type1) || !types.includes(type2)) {
    console.log("Помилка: неправильний тип. Перечитай інструкцію на початку.");
    return "failed";
  }
  if (value1 <= 0 || value2 <= 0) {
    console.log("Некоректні дані: значення мають бути більшими за 0");
    return "failed";
  }

  if ((type1.includes("angle") && (value1 <= 0 || value1 >= 90)) ||
      (type2.includes("angle") && (value2 <= 0 || value2 >= 90))) {
    console.log("Некоректні дані: кут має бути гострим (від 0 до 90)");
    return "failed";
  }
  
  let a, b, c, alpha, beta;
  const combo = type1 + "|" + type2;

  switch (combo) {
  case "leg|leg":
    a = value1;
    b = value2;
    c = Math.sqrt(a * a + b * b);
    alpha = Math.asin(a / c) * 180 / Math.PI;
    beta = 90 - alpha;
    break;

  case "leg|hypotenuse":
  case "hypotenuse|leg": {
    const leg = (type1 === "leg") ? value1 : value2;
    const hyp = (type1 === "hypotenuse") ? value1 : value2;

    if (leg >= hyp) return "Некоректні дані: катет має бути менший за гіпотенузу.";

    a = leg;
    c = hyp;
    b = Math.sqrt(c * c - a * a);

    alpha = Math.asin(a / c) * 180 / Math.PI;
    beta = 90 - alpha;
    break;
  }

  case "leg|adjacent angle":
  case "adjacent angle|leg": {
  const leg = (type1 === "leg") ? value1 : value2;
  const angle = (type1 === "adjacent angle") ? value1 : value2;

  b = leg;
  c = b / Math.cos(angle * Math.PI / 180);
  a = b * Math.tan(angle * Math.PI / 180);

  alpha = angle;
  beta = 90 - alpha;
  break;
  }


  case "leg|opposite angle":
  case "opposite angle|leg": {
    const leg = (type1 === "leg") ? value1 : value2;
    const angle = (type1 === "opposite angle") ? value1 : value2;

    a = leg;
    c = a / Math.sin(angle * Math.PI / 180);
    b = a / Math.tan(angle * Math.PI / 180);

    alpha = angle;
    beta = 90 - alpha;
    break;
  }

  case "angle|hypotenuse":
  case "hypotenuse|angle": {
    const hyp = (type1 === "hypotenuse") ? value1 : value2;
    const angle = (type1 === "angle") ? value1 : value2;

    c = hyp;
    alpha = angle;  
    beta = 90 - alpha;

    a = c * Math.sin(angle * Math.PI / 180);
    b = c * Math.cos(angle * Math.PI / 180);
    break;
  }

  default:
    console.log("Помилка: несумісна пара типів. Перечитай інструкцію на початку сценарію.");
    return "failed";
}
    console.log("c = " + c);
    console.log("a = " + a);
    console.log("b = " + b);
    console.log("alpha = " + alpha);
    console.log("beta = " + beta);

  return "success";
}
