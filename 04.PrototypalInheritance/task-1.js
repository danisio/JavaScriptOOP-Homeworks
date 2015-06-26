/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototype inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


/* Example
var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');
var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)
var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');
div.content = 'Hello, world!';
var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');
var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);
console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/

function solve() {
    function validateType(type) {
        if (typeof type !== 'string') {
            throw new Error('Type is not string!')
        }

        if (!type) {
            throw new Error('The type is empty!')
        }

        if (!/^[a-z0-9]+$/i.test(type)) {
            throw new Error('Only latin and digits, please!')
        }
    }

    function validateName(name) {
        if (!name) {
            throw new Error('The name is empty')
        }

        if (!/^[a-z0-9\-]+$/i.test(name)) {
            throw new Error('Only latin, digits and "-", please!')
        }
    }

    var domElement = (function () {
        var domElement = {
            init: function (type) {
                this.type = type;
                this.content;
                this.parent;
                this.children = [];
                this.attributes = [];

                return this;
            },
            appendChild: function (child) {
                this.children.push(child);
                if (typeof child === 'object') {
                    child.parent = this;
                }

                return this;
            },
            addAttribute: function (name, value) {
                validateName(name);
                this.attributes[name] = value;
                return this;
            },
            removeAttribute: function (name) {
                if (!this.attributes[name]) {
                    throw new Error('Invalid attribute!');
                }

                delete this.attributes[name];

                return this;
            },
            get innerHTML() {
                var result = '<' + this.type,
                    keys = [],
                    attr,
                    i,
                    len;

                if (this.attributes.length === 0) {
                    for (attr in this.attributes) {
                        if (this.attributes.hasOwnProperty(attr)) {
                            keys.push(attr);
                        }
                    }

                    keys.sort();
                    for (i = 0,len = keys.length; i < len; i+=1) {
                        result += ' ' + keys[i] + '="' + this.attributes[keys[i]] + '"';
                    }
                }

                result += '>';

                if (this.children.length > 0) {

                    for (i = 0,len = this.children.length; i < len; i+=1) {
                        if (typeof this.children[i] ==='string') {
                            result += this.children[i];
                        } else {
                            result += this.children[i].innerHTML;
                        }
                    }
                } else if (this.content) {
                    result += this.content;
                }

                result += '</' + this.type + '>';

                return result;
            },
            get type() {
                return this._type;
            },
            set type(value) {
                validateType(value);
                this._type = value;
            },
            get content() {
                return this._content || '';
            },
            set content(value) {
                this._content = value;
            },
            get children() {
                return this._children;
            },
            set children(value) {
                this._children = value;
            },
            get parent() {
                return this._parent;
            },
            set parent(value) {
                this._parent = value;
            },
        };

        return domElement;
    }());

    return domElement;
}
