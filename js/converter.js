// XML to JSON Converter Logic

/**
 * Parse XML string to JSON object
 * @param {string} xmlStr - XML string to parse
 * @returns {object} - Parsed JSON object
 */
function parseXmlToJson(xmlStr) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlStr, "text/xml");

        // Check for parsing errors
        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            return { error: "خطأ في صيغة XML" };
        }

        function xmlToObj(node) {
            let obj = {};

            if (node.nodeType === 1) { // element
                // Attributes
                if (node.attributes.length > 0) {
                    for (let j = 0; j < node.attributes.length; j++) {
                        const attribute = node.attributes.item(j);
                        obj["@" + attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (node.nodeType === 3) { // text
                return node.nodeValue.trim();
            }

            // Children
            if (node.hasChildNodes()) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    const item = node.childNodes.item(i);
                    const nodeName = item.nodeName;

                    // Ignore comments and pure whitespace
                    if (nodeName === "#comment") continue;
                    if (nodeName === "#text" && !item.nodeValue.trim()) continue;

                    let result = xmlToObj(item);

                    // Handle mixed text with attributes
                    if (Object.keys(obj).length > 0 && typeof result === 'string' && node.childNodes.length === 1) {
                        obj["#text"] = result;
                    } else if (typeof result === 'string' && Object.keys(obj).length === 0) {
                        return result; // text only
                    } else {
                        // Add to result
                        if (obj[nodeName] === undefined) {
                            obj[nodeName] = result;
                        } else {
                            if (obj[nodeName].push === undefined) {
                                const old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(result);
                        }
                    }
                }
            }
            return obj;
        }

        // Skip comments at root to find the real root element
        let realRoot = null;
        for (let i = 0; i < xmlDoc.childNodes.length; i++) {
            if (xmlDoc.childNodes[i].nodeType === 1) {
                realRoot = xmlDoc.childNodes[i];
                break;
            }
        }

        if (!realRoot) return {};

        let result = {};
        result[realRoot.nodeName] = xmlToObj(realRoot);
        return result;

    } catch (e) {
        return { error: e.message };
    }
}

export { parseXmlToJson };
