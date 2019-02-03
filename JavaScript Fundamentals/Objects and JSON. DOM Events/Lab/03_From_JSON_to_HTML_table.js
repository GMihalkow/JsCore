function solve(input){
        function defineElement(tagName){
            let tag = `<${tagName}></${tagName}>`;
            return tag;
        }
    
        function append(parent, child){
            let tempElement = parent.slice(0);
            let lastIndex = tempElement.lastIndexOf('</');
    
            let firstPart = tempElement.substring(0, +lastIndex);
    
            let middlePart = child;
    
            let remainingPart = tempElement.substring(+lastIndex, tempElement.length);
    
            let newElement = firstPart + middlePart + remainingPart;
    
            return newElement;
        }
    
        function escapeHtml(unsafe) {
            return unsafe.toString().replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#39;");
         }
    
        let table = '<table>\n';
    
        let arr = JSON.parse(input);
        
        let headingRow = defineElement('tr');
    
        Object.keys(arr[0]).forEach((key) => {
            let heading = defineElement('th');
            heading = append(heading, key);
            
            headingRow = append(headingRow, heading);
        });
    
        table += '   ' + headingRow + '\n';
    
        Array.from(arr).forEach((obj) => {
            let dataRow = defineElement('tr');
            Object.values(obj).forEach((value) =>{
                let data = defineElement('td');
                let tempValue = escapeHtml(value);
    
                data = append(data, tempValue);
            
                dataRow = append(dataRow, data);
            });
    
            table += '   ' + dataRow + '\n';
        });
        table += '</table>';
        console.log(table);
}

solve(
        '[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]'
    
);