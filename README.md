## osx-scrollview

[![NPM](https://nodei.co/npm/osx-scrollview.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/osx-scrollview/)

An osx style scroll view react component.

Check demo at <http://blog.sibo.me/osx-scrollview/>

**Important Notes: if you already have an osx-style scrollbar(osx, ios), it will use scrollbar of the system. All features has not been implemented.**

### Installation

    npm install osx-scrollview

### Usage

Append `dist/style.css` to your css file.

    import {render} from "react-dom";
    import ScrollView from "osx-scrollview";

    render((
        <div style={{width: 300, height: 300}}>
            <ScrollView>
                <div style={{width: 400, height: 400}}>Content</div>
            </ScrollView>
        </div>
    ), document.getElementById('container'));

### License

MIT
