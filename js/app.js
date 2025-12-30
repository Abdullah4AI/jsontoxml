// Main Application Logic
import examples from './examples.js';
import { parseXmlToJson } from './converter.js';

// Variables and Initialization
let currentMode = 'xml2json'; // or 'json2xml'

// DOM Elements
const inputArea = document.getElementById('inputArea');
const outputArea = document.getElementById('outputArea');
const exampleSelector = document.getElementById('exampleSelector');
const explanationText = document.getElementById('explanationText');

const btnXmlToJson = document.getElementById('btnXmlToJson');
const btnJsonToXml = document.getElementById('btnJsonToXml');
const convertBtn = document.getElementById('convertBtn');
const leftLabel = document.getElementById('leftLabel');
const rightLabel = document.getElementById('rightLabel');

// UI Management Functions
function updateLabels() {
    if (currentMode === 'xml2json') {
        leftLabel.innerHTML = '<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">XML</span> المصدر';
        rightLabel.innerHTML = '<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">JSON</span> النتيجة';
        btnXmlToJson.classList.add('bg-white', 'text-indigo-700', 'shadow-sm');
        btnXmlToJson.classList.remove('text-slate-600');
        btnJsonToXml.classList.remove('bg-white', 'text-indigo-700', 'shadow-sm');
        btnJsonToXml.classList.add('text-slate-600');

        // Load current example on the left side
        const key = exampleSelector.value;
        inputArea.value = examples[key].xml;
        outputArea.value = ""; // Clear result

    } else {
        leftLabel.innerHTML = '<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">JSON</span> المصدر';
        rightLabel.innerHTML = '<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">XML</span> النتيجة';
        btnJsonToXml.classList.add('bg-white', 'text-indigo-700', 'shadow-sm');
        btnJsonToXml.classList.remove('text-slate-600');
        btnXmlToJson.classList.remove('bg-white', 'text-indigo-700', 'shadow-sm');
        btnXmlToJson.classList.add('text-slate-600');

        // Load current example on the left side
        const key = exampleSelector.value;
        inputArea.value = examples[key].json;
        outputArea.value = ""; // Clear result
    }
    explanationText.textContent = "اضغط على زر التحويل لرؤية النتيجة والشرح.";
}

// Conversion handler
function handleConvert() {
    const key = exampleSelector.value;
    const currentExample = examples[key];

    // Add simple loading effect
    outputArea.value = "جاري التحويل...";

    setTimeout(() => {
        if (currentMode === 'xml2json') {
            // In guide mode, show pre-prepared result for accuracy
            // But if user modified the text, attempt dynamic conversion
            if (inputArea.value.trim() === currentExample.xml.trim()) {
                outputArea.value = currentExample.json;
            } else {
                // Dynamic conversion for custom input
                const dynamicResult = parseXmlToJson(inputArea.value);
                outputArea.value = JSON.stringify(dynamicResult, null, 2);
            }
        } else {
            // JSON to XML
            if (inputArea.value.trim() === currentExample.json.trim()) {
                outputArea.value = currentExample.xml;
            } else {
                // For simplicity in this guide, show note for custom JSON
                outputArea.value = "⚠️ ملاحظة: التحويل الديناميكي العكسي الكامل (من JSON مخصص إلى XML) يتطلب مكتبات متقدمة.\n\nإليك المثال القياسي:\n" + currentExample.xml;
            }
        }

        // Show explanation
        explanationText.innerHTML = `<strong>شرح المثال (${exampleSelector.options[exampleSelector.selectedIndex].text}):</strong><br/> ${currentExample.explanation}`;
    }, 300);
}

// Event Listeners
btnXmlToJson.addEventListener('click', () => {
    currentMode = 'xml2json';
    updateLabels();
});

btnJsonToXml.addEventListener('click', () => {
    currentMode = 'json2xml';
    updateLabels();
});

exampleSelector.addEventListener('change', () => {
    updateLabels();
});

convertBtn.addEventListener('click', handleConvert);

// Initial setup
updateLabels();
