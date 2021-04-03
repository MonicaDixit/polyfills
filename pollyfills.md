/\***\*\*\*\*\*\*\***\*\*\***\*\*\*\*\*\*\***\*\***\*\*\*\*\*\*\***\*\*\***\*\*\*\*\*\*\*** \*/
// InnerText vs textContent vs innerHTML
/\***\*\*\*\*\*\*\***\*\*\***\*\*\*\*\*\*\***\*\***\*\*\*\*\*\*\***\*\*\***\*\*\*\*\*\*\*** \*/
Dont get confused by Node.textContent and HTMLElement.innerText
textContent gets the content of all customElements, including <script> and <Style>
textContent returns every element in the node. InnerText is aware of the stylings and wont return hidden elements.
Since innerText takes CSS styles into account, reading the value of innerText triggers a reflow to ensure upto date computed styles.

textContent is aware of the white spaces where innerText is not
textContent is better for performance

Element.innerHTML returns HTML. Sometimes people use innerHTML to retrieve or write text inside an element, but textContent has better performance because its value is not parsed as HTML. Using textCOntent can prevent XSS attacks
