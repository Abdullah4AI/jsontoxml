// Examples Data
const examples = {
    simple: {
        xml: `<!-- مثال 1: كائن بسيط -->
<employee>
    <id>101</id>
    <name>أحمد علي</name>
    <role>مطور ويب</role>
    <active>true</active>
</employee>`,
        json: `{
  // مثال 1: كائن بسيط
  "employee": {
    "id": 101,
    "name": "أحمد علي",
    "role": "مطور ويب",
    "active": true
  }
}`,
        explanation: "في الحالة البسيطة: تتحول التاغات (Tags) في XML إلى مفاتيح (Keys) في JSON. النص داخل التاغ يصبح القيمة (Value). لاحظ كيف يتم تحويل الأرقام والقيم المنطقية (true/false) مباشرة إذا أمكن التعرف عليها."
    },
    array: {
        xml: `<!-- مثال 2: مصفوفة -->
<library>
    <book>
        <title>مقدمة في البرمجة</title>
        <price>50</price>
    </book>
    <book>
        <title>عالم الذكاء الاصطناعي</title>
        <price>75</price>
    </book>
</library>`,
        json: `{
  // مثال 2: مصفوفة
  "library": {
    "book": [
      {
        "title": "مقدمة في البرمجة",
        "price": 50
      },
      {
        "title": "عالم الذكاء الاصطناعي",
        "price": 75
      }
    ]
  }
}`,
        explanation: "عندما يتكرر نفس التاغ (book) داخل العنصر الأب (library) في XML، يتم تحويله في JSON إلى مصفوفة (Array) [ ... ] تحتوي على كائنات."
    },
    attributes: {
        xml: `<!-- مثال 3: التعامل مع السمات -->
<product id="p500" category="electronics">
    <name>هاتف ذكي</name>
    <stock>20</stock>
</product>`,
        json: `{
  // مثال 3: السمات تتحول لخصائص
  "product": {
    "@id": "p500",
    "@category": "electronics",
    "name": "هاتف ذكي",
    "stock": 20
  }
}`,
        explanation: "السمات (Attributes) في XML مثل id=\"p500\" لا يوجد لها مقابل مباشر في بنية JSON القياسية. العرف السائد هو تحويلها إلى مفاتيح تبدأ بـ @ أو _ (مثل @id) لتمييزها عن العناصر الفرعية."
    },
    nested: {
        xml: `<!-- مثال 4: هياكل متداخلة -->
<menu>
    <breakfast>
        <item>بيض مقلي</item>
        <item>قهوة</item>
    </breakfast>
    <lunch>
        <main>دجاج مشوي</main>
        <side>سلطة</side>
    </lunch>
</menu>`,
        json: `{
  // مثال 4: الكائنات المتداخلة
  "menu": {
    "breakfast": {
      "item": [
        "بيض مقلي",
        "قهوة"
      ]
    },
    "lunch": {
      "main": "دجاج مشوي",
      "side": "سلطة"
    }
  }
}`,
        explanation: "يظهر هنا التداخل (Nesting). العنصر <breakfast> يحتوي على مصفوفة نصوص لأن <item> تكرر. بينما <lunch> يحتوي على كائن لأن عناصره مختلفة ومسماة."
    },
    mixed: {
        xml: `<!-- مثال 5: بيانات مختلطة -->
<config>
    <server>production-01</server>
    <ports>
        <port>80</port>
        <port>443</port>
        <port>8080</port>
    </ports>
    <admin_contact email="admin@site.com">الدعم الفني</admin_contact>
</config>`,
        json: `{
  // مثال 5: قيمة نصية مع سمات
  "config": {
    "server": "production-01",
    "ports": {
      "port": [ 80, 443, 8080 ]
    },
    "admin_contact": {
      "@email": "admin@site.com",
      "#text": "الدعم الفني"
    }
  }
}`,
        explanation: "حالة متقدمة: عندما يحتوي عنصر XML على نص وسمة في نفس الوقت (مثل admin_contact)، يتم وضع النص عادة في مفتاح خاص يسمى #text أو content، والسمات في مفاتيحها الخاصة."
    }
};

export default examples;
